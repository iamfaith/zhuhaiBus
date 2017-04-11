/**
 * Created by faith on 2017/3/22.
 */
import React from
    'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
// import Button from 'react-native-button'
import  BusQry from '../service/BusQry'
import  BaseComponent from '../common/BaseComponent'
import  Define from '../common/Define'
import  BusStation from '../model/BusStation'
import Toast from '../component/Toast'
import Validate from '../util/Validate'
import HashMap from '../common/HashMap'
import BackgroundTimer from 'react-native-background-timer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../component/Header'
import Autocomplete from '../component/Autocomplete'

export default class RealTimeSearch extends BaseComponent {

    static OP = {
        STATION_QRY: '1',
        STATION_DETAIL_QRY: '2',
        BUS_INFO_QRY: '3',
        GET_BUSLIST_BYNAME: '4',
    }

    static DIR = {
        INIT: 0,
        REVERT: 1,
    }

    constructor(props) {
        super(props);
        this.cache = [];
        this.index = RealTimeSearch.DIR.INIT; //表示方向
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            text: '',
            stations: [],
            qryResult: [],
        }
    }


    _searchBusLine(busLine, busId = null, from = null, to = null) {

        if (null == busLine || busLine == '') {
            this.toastRef.showToast(Define.String.PLS_INPUT_BUS);
            return;
        }
        let lastIndex = busLine.lastIndexOf('路');
        if (lastIndex != -1) {
            busLine = busLine.substr(0, lastIndex);
        }
        if (!Validate.checkNumAndLetter(busLine)) {
            this.toastRef.showToast(Define.String.INPUT_INVALID);
            return;
        }


        this.doGet(BusQry.qryBusStation(busLine), {
            op: RealTimeSearch.OP.STATION_QRY,
            Id: busId,
            FromStation: from,
            ToStation: to,
        });
    }

    qryBusStationDetail(from = null, to = null, busId = null) {

        let qryId = busId == null ? this.state.stations[this.index].id : busId;
        let fromStation = from == null ? this.state.stations[this.index].fromStation : from;
        let toStation = to == null ? this.state.stations[this.index].toStation : to;
        this.doGet(BusQry.qryBusStationDetail(qryId), {
            op: RealTimeSearch.OP.STATION_DETAIL_QRY,
            id: qryId,
            fromStation: fromStation,
            toStation: toStation,
        });
    }

    updateState(responseData) {
        super.updateState(responseData);
        let callback = responseData.callback;
        if (callback.op == RealTimeSearch.OP.STATION_QRY) {
            let stations = responseData.data;
            // console.log(stations == null ? "" : stations);
            if (stations != null) {
                this.state.stations = [];
                for (let i = 0, len = stations.length; i < len; i++) {
                    let busStation = new BusStation(stations[i]);
                    this.state.stations.push(busStation);
                }
                this.qryBusStationDetail(callback.FromStation, callback.ToStation, callback.Id);
                // let qryId = this.state.stations[0].id;
                // let fromStation = this.state.stations[0].fromStation;
                // this.doGet(BusQry.qryBusStationDetail(this.state.stations[0].id), {
                //     op: RealTimeSearch.OP.STATION_DETAIL_QRY,
                //     id: qryId,
                //     fromStation: fromStation,
                // });
            } else {
                this.toastRef.showToast(Define.String.NO_BUS);
            }
        } else if (callback.op == RealTimeSearch.OP.STATION_DETAIL_QRY) {
            let param = {};
            this.cache = responseData.data;
            for (let i = 0, len = this.state.stations.length; i < len; i++) {
                let station = this.state.stations[i];
                if (station.id == callback.id) {
                    param = {
                        beginTime: station.beginTime,
                        endTime: station.endTime,
                        price: station.price,
                        fromStation: callback.fromStation,
                        toStation: callback.toStation,
                    }

                    break;
                }
            }

            this.state.dataSource = this.state.dataSource.cloneWithRows(this.cache),
                this.setState(this.state.dataSource);
            let lineName = String(this.state.text);
            lineName = lineName.toUpperCase();
            if (Validate.checkNum(lineName))
                lineName = lineName + "路";
            let fromStation = callback.fromStation;

            param.busName = lineName;

            const data = {lineName: lineName, fromStation: fromStation};
            this.doGet(BusQry.qryBusInfo(data), {
                op: RealTimeSearch.OP.BUS_INFO_QRY,
                param: param,
            });
        } else if (callback.op == RealTimeSearch.OP.BUS_INFO_QRY) {
            let busList = responseData.data;

            if (busList != null) {
                let param = callback.param;
                param.busSum = busList.length;
                this.headerRef.updateHeader(param);

                let busInfoMap = new HashMap();
                for (let j = 0, len = this.cache.length; j < len; j++) {
                    busInfoMap.set(this.cache[j]["Name"], j);
                }

                let newBusCache = this.cache.slice();

                for (let i = 0, len = busList.length; i < len; i++) {
                    let busInfo = busList[i];
                    let index = busInfoMap.get(busInfo["CurrentStation"]);
                    if (index != undefined) {
                        if (this.cache[index].Name == "海虹总站") {
                            debugger;
                            // this.toastRef.showToast(JSON.stringify(newBusCache[index]), false);
                        }

                        newBusCache[index] = {
                            BusNumber: newBusCache[index]["BusNumber"] == null || newBusCache[index]["BusNumber"] == undefined ? busInfo["BusNumber"] : newBusCache[index]["BusNumber"] + " " + busInfo["BusNumber"],
                            Name: newBusCache[index].Name,
                            BeginTime: newBusCache[index].BeginTime,
                            EndTime: newBusCache[index].EndTime,
                            Price: newBusCache[index].Price,
                        };
                    }


                }

                this.state.dataSource = this.state.dataSource.cloneWithRows(newBusCache),
                    this.setState(this.state.dataSource);

            } else {
                this.toastRef.showToast(Define.String.NO_BUS_ALAIABLE);
            }

        } else if (callback.op == RealTimeSearch.OP.GET_BUSLIST_BYNAME) {
            if (responseData == undefined) {
                this.state.qryResult = [];
                this.setState(this.state);
                return;
            }
            let busList = responseData.data
            if (busList == undefined || busList == null) {
                this.state.qryResult = [];
                this.setState(this.state);
                return;
            }
            let len = busList.length;
            if (len > 0) {
                let qryResult = [];
                for (let i = 0; i < len; i++) {
                    // console.log("busList " + busList[i] == null ? "" : busList[i]);
                    qryResult.push({
                        Id: busList[i]["Id"],
                        LineNumber: busList[i]["LineNumber"],
                        FromStation: busList[i]["FromStation"],
                        ToStation: busList[i]["ToStation"],
                        Direction: busList[i]["FromStation"] + " => " + busList[i]["ToStation"]
                    });
                }
                this.state.qryResult = qryResult;
                this.setState(this.state);
            }

        }

    }

    queryBusData(data) {
        this.doGet(BusQry.qryGetLineListByLineName(data), {
            op: RealTimeSearch.OP.GET_BUSLIST_BYNAME,
        });

        // if (data == '10')
        //     return [10, 3, 23, 22];
        // else {
        //     return [];
        // }
    }

    componentWillUnMount() {
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer && clearInterval(this.timer);
        BackgroundTimer.clearInterval(this.intervalId);
    }

    render() {
        return (
            <View style={styles.container}>
                <Autocomplete ref={autoCompleteRef => this.autoCompleteRef = autoCompleteRef }
                              data={this.state.qryResult}
                              defaultValue={this.state.text}
                              autoCapitalize="none"
                              placeholder={Define.String.PLS_INPUT_BUS}
                              onChangeText={text => {
                                  this.state.text = text;
                                  this.queryBusData(text);
                                  this.setState(this.state);
                              }}
                              value={String(this.state.text)}
                              listContainerStyle={styles.overlay}
                              renderItem={(data) => (
                                  <TouchableOpacity onPress={() => {
                                      this.intervalId && BackgroundTimer.clearInterval(this.intervalId);
                                      this.state.text = data.LineNumber;
                                      this.state.qryResult = [];
                                      this.setState(this.state);
                                      this._searchBusLine(this.state.text, data.Id, data.FromStation, data.ToStation);
                                  }}>
                                      <Text>{data.LineNumber + "    " + data.Direction}</Text>
                                  </TouchableOpacity>
                              )}
                />
                {/*<Button*/}
                {/*style={styles.searchButton}*/}
                {/*styleDisabled={{color: 'red'}}*/}
                {/*onPress={() => this._searchBusLine()}>*/}
                {/*{Define.String.SearchBus}*/}
                {/*</Button>*/}
                <Header visible={false} ref={headerRef => this.headerRef = headerRef}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderBusStation}
                    style={styles.listView}
                />
                <Toast ref={toastRef => this.toastRef = toastRef}/>

                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title={Define.String.CLOCK} onPress={() => {
                        this.intervalId = BackgroundTimer.setInterval(() => {
                            this._searchBusLine(this.state.text);
                        }, 3000);

                    }}>
                        <Icon name="md-clock" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' title={Define.String.CHANGE_LINE}
                                       onPress={() => {
                                           if (this.state.stations == null || this.state.stations.length == 0) {
                                               this.toastRef.showToast(Define.String.SEARCH_FIRST);
                                               return;
                                           }
                                           if (this.index == RealTimeSearch.DIR.INIT) {
                                               this.index = RealTimeSearch.DIR.REVERT;
                                           } else {
                                               this.index = RealTimeSearch.DIR.INIT;
                                           }
                                           this.qryBusStationDetail();
                                       }}>
                        {/*<i class="icon ion-arrow-swap" style={styles.actionButtonIcon}></i>*/}
                        <Icon name="md-shuffle" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title={Define.String.SEARCH} onPress={() => {
                        this._searchBusLine(this.state.text);
                    }}>
                        <Icon name="md-search" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }

    renderBusStation(data) {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <Icon name="md-bus" style={styles.actionBusIcon}/>
                    <Text style={styles.title}>{data.Name}</Text>

                    <Text style={styles.busNumber}>{data.BusNumber}</Text>
                </View>
            </View>
        );
    }

}

/**
 *          <Text style={styles.title}>{data.BeginTime}</Text>
 <Text style={styles.title}>{data.EndTime}</Text>
 <Text style={styles.title}>{data.Price}</Text>
 */

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },

    searchButton: {
        fontSize: 20,
        color: 'green'
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        marginBottom: 5,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderColor: '#f5fcff',
        borderWidth: 2,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
        flex: 2,
    },
    busNumber: {
        color: 'blue',
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
        flex: 1,
    },
    listView: {
        backgroundColor: '#e8e8e8',
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

    actionBusIcon: {
        fontSize: 25,
        height: 25,
        flex: 1,
    },

    overlay: {
        zIndex: 1,
        position: 'absolute',
        opacity: 0.9,
        top: 35,
        flex: 1,
        flexDirection: 'row'
    }
});