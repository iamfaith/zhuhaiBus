import React, {
    Component
} from
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

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar}from 'react-native-scrollable-tab-view'
import  RealTimeSearch from './js/component/RealTimeSearch'
import Define from './js/common/Define'

export default class setup extends Component {

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}>
                <RealTimeSearch tabLabel={Define.String.REAL_TIME_SEARCH} />
                <Text tabLabel={Define.String.TRANSFER_BUS} />
                <Text tabLabel={Define.String.SEARCH_GOV_BIKE}  />
            </ScrollableTabView>
        );
    }


}

