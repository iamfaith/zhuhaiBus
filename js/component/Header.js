/**
 * Created by faith on 2017/3/21.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Define from '../common/Define'

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busSum: 0,
            workingBus: '',
            busInfo: '',
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>{this.state.busName + this.state.workingBus}</Text>
                <Text style={styles.directionText}>{this.state.fromStation}. .{this.state.toStation}</Text>
                <Text style={styles.busInfo}>{this.state.busInfo}</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        marginBottom: 5,
    },

    headerText: {
        fontSize: 30,
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(231,76,60,1)'
    },
    directionText: {
        fontSize: 25,
        marginBottom: 8,
        textAlign: 'center',
    },
    busInfo: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },

});