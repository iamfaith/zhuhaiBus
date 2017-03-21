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
} from 'react-native';
// import Button from 'react-native-button'
import  BusQry from './js/service/BusQry'
import  BaseComponent from './js/common/BaseComponent'
import  Define from './js/common/Define'
import  BusStation from './js/model/BusStation'
import Toast from 'react-native-root-toast'
import Validate from './js/util/Validate'
import HashMap from './js/common/HashMap'

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './js/component/Header'

export default class setup extends BaseComponent {

    static OP = {
        STATION_QRY: '1',
        STATION_DETAIL_QRY: '2',
        BUS_INFO_QRY: '3'
    }

    static DIR = {
        INIT: 0,
        REVERT: 1,
    }

    constructor(props) {
        super(props);
        this.cache = [];
        this.index = setup.DIR.INIT; //表示方向
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            text: '',
            stations: [],
            toast: {
                visible: false,
                msg: '',
            }
        }
    }

    _updateHeader(param) {
        let busSum = param.busSum;
        let busInfo = {
            beginTime: param.beginTime,
            endTime: param.endTime,
            price: param.price,
        }
        this.state.workingBus = Define.String.WORKING_BUS;
        this.state.busInfo = Define.String.BUS_INFO;

        this.state.busName = param.busName;
        this.state.fromStation = param.fromStation;
        this.state.toStation = param.toStation;

    }

    hideToast() {
        setTimeout(() => {
            this.state.toast = {
                visible: false,
            };
            this.setState(this.state);
        }, 800);
    }

    showToast(msg, isHidden = true) {
        this.state.toast = {
            visible: true,
            msg: msg,
        };
        this.setState(this.state);
        if (isHidden)
            this.hideToast();
    }

    _searchBusLine() {
        if (null == this.state.text || this.state.text == '') {
            this.showToast(Define.String.PLS_INPUT_BUS);
            return;
        }

        if (!Validate.checkNum(this.state.text)) {
            this.showToast(Define.String.INPUT_INVALID);
            return;
        }

        this.doGet(BusQry.qryBusStation(this.state.text), {
            op: setup.OP.STATION_QRY
        });
    }

    qryBusStationDetail() {
        let qryId = this.state.stations[this.index].id;
        let fromStation = this.state.stations[this.index].fromStation;
        this.doGet(BusQry.qryBusStationDetail(qryId), {
            op: setup.OP.STATION_DETAIL_QRY,
            id: qryId,
            fromStation: fromStation,
        });
    }

    updateState(responseData) {
        super.updateState(responseData);
        let callback = responseData.callback;
        if (callback.op == setup.OP.STATION_QRY) {
            let stations = responseData.data;
            if (stations != null) {
                this.state.stations = [];
                for (let i = 0, len = stations.length; i < len; i++) {
                    let busStation = new BusStation(stations[i]);
                    this.state.stations.push(busStation);
                }
                this.qryBusStationDetail();
                // let qryId = this.state.stations[0].id;
                // let fromStation = this.state.stations[0].fromStation;
                // this.doGet(BusQry.qryBusStationDetail(this.state.stations[0].id), {
                //     op: setup.OP.STATION_DETAIL_QRY,
                //     id: qryId,
                //     fromStation: fromStation,
                // });
            } else {
                this.showToast(Define.String.NO_BUS);
            }
        } else if (callback.op == setup.OP.STATION_DETAIL_QRY) {
            this.cache = responseData.data;
            for (let i = 0, len = this.state.stations.length; i < len; i++) {
                let station = this.state.stations[i];
                if (station.id == callback.id) {
                    this.cache.forEach(function (item, index) {
                        item.Price = station.price;
                        item.BeginTime = station.beginTime;
                        item.EndTime = station.endTime;
                    });
                    break;
                }
            }

            this.state.dataSource = this.state.dataSource.cloneWithRows(this.cache),
                this.setState(this.state.dataSource);

            let lineName = this.state.text + "路";
            let fromStation = callback.fromStation;
            const data = {lineName: lineName, fromStation: fromStation};
            console.log(data);
            this.doGet(BusQry.qryBusInfo(data), {
                op: setup.OP.BUS_INFO_QRY,
            });
        } else if (callback.op == setup.OP.BUS_INFO_QRY) {
            console.log(responseData);
            let busList = responseData.data;
            if (busList != null) {
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
                            // this.showToast(JSON.stringify(newBusCache[index]), false);
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
                this.showToast(Define.String.NO_BUS_ALAIABLE);
            }

        }

    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                {/*<Button*/}
                {/*style={styles.searchButton}*/}
                {/*styleDisabled={{color: 'red'}}*/}
                {/*onPress={() => this._searchBusLine()}>*/}
                {/*{Define.String.SearchBus}*/}
                {/*</Button>*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderBusStation}
                    style={styles.listView}
                />
                <Toast
                    visible={this.state.toast.visible}
                    position={Toast.positions.CENTER}
                    duration={Toast.durations.LONG}
                    shadow={true}
                    animation={true}
                    hideOnPress={true}
                >{this.state.toast.msg}</Toast>

                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title={Define.String.CHANGE_LINE}
                                       onPress={() => {
                                           if (this.state.stations == null || this.state.stations.length == 0) {
                                               this.showToast(Define.String.SEARCH_FIRST);
                                               return;
                                           }
                                           if (this.index == setup.DIR.INIT) {
                                               this.index = setup.DIR.REVERT;
                                           } else {
                                               this.index = setup.DIR.INIT;
                                           }
                                           this.qryBusStationDetail();
                                       }}>
                        {/*<i class="icon ion-arrow-swap" style={styles.actionButtonIcon}></i>*/}
                        <Icon name="md-shuffle" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title={Define.String.SEARCH} onPress={() => {
                        this._searchBusLine();
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
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    busNumber: {
        color: 'blue',
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});