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
import  WebView from './js/component/BusWebView'
import  MySetting from './js/component/MySetting'
import Define from './js/common/Define'
// import Tabs from 'react-native-tabs';
export default class setup extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 'second'};
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                tabBarPosition='bottom'
                locked={true}
            >
                <RealTimeSearch tabLabel={Define.String.REAL_TIME_SEARCH} />
                {/*<WebView tabLabel={Define.String.SEARCH_GOV_BIKE}  />*/}
                <MySetting tabLabel={Define.String.SETTING} />
            </ScrollableTabView>
            // <Tabs  style={{backgroundColor: 'white'}}
            //       selectedStyle={{color: 'red'}} >
            //     <RealTimeSearch name="first">{Define.String.REAL_TIME_SEARCH}</RealTimeSearch>
            //     <WebView name="second" selectedIconStyle={{
            //         borderTopWidth: 2,
            //         borderTopColor: 'red'
            //     }}>{Define.String.SEARCH_GOV_BIKE}</WebView>
            //     <Text name="third">{Define.String.SETTING}</Text>
            // </Tabs>

        );
    }


}

