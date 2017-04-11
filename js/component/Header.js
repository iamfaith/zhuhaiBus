/**
 * Created by faith on 2017/3/21.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Define from '../common/Define'

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busSum: 0,
            workingBus: '',
            busInfo: '',
            fromStation: '',
            toStation: '',
            visible: false,
        }
    }


    updateHeader(param) {
        var busSum = param.busSum;
        var busInfo = {
            beginTime: param.beginTime,
            endTime: param.endTime,
            price: param.price,
        }
        let WORKING_BUS = `(${busSum}辆公交在行驶中)`;
        let BUS_INFO = `首班车: ${busInfo.beginTime} 末班车: ${busInfo.endTime} 票价: ${busInfo.price}元`;
        this.state.workingBus = WORKING_BUS;
        this.state.busInfo = BUS_INFO;

        this.state.busName = param.busName;
        this.state.fromStation = param.fromStation;
        this.state.toStation = param.toStation;
        this.state.visible = true;
        this.setState(this.state);
    }


    renderHeader() {
        if (this.state.visible) {
            return (
                <View style={styles.container}>
                    <Text style={styles.headerText}>{this.state.busName + this.state.workingBus}</Text>
                    <Text style={styles.directionText}>{this.state.fromStation} => {this.state.toStation}</Text>
                    <Text style={styles.busInfo}>{this.state.busInfo}</Text>
                </View>);
        } else {
            return null;
        }
    }

    render() {
        return (<View>
            {this.renderHeader()}
        </View>);

    }


}

const styles = StyleSheet.create({


    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#FA901E',
    },

    headerText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(231,76,60,0.6)'
    },
    directionText: {
        fontSize: 25,
        textAlign: 'center',
    },
    busInfo: {
        fontSize: 20,
        textAlign: 'center',
    },

});