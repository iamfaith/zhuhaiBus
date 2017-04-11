/**
 * Created by faith on 2017/4/11.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    ReactNative
} from 'react-native';

var DEFAULT_URL = 'http://bike.dev.gdczkj.com/index/bikeuse/showstation';

// var DEFAULT_URL = 'http://www.baidu.com';

export default class BusWebView extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>

                <WebView style={styles.webviewStyle}
                         source={{uri: DEFAULT_URL}}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    webviewStyle: {
        backgroundColor: '#F5FCFF',
    }
});
