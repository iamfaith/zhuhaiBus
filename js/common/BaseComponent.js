/**
 * Created by faith on 2017/3/18.
 */
import React, {
    Component,
} from 'react';

export default class BaseComponent extends Component {


    updateState(dic) {
        if (!this)return;
    }


    doGet(httpClient, callback = null, isObj = true) {
        return fetch(httpClient.url, {
                method: httpClient.method,
                headers: httpClient.header,
                body: httpClient.body,
            },
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (callback != null) {
                    responseJson.callback = callback
                }
                if (isObj == false)
                    this.updateState(JSON.stringify(responseJson));
                else
                    this.updateState(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return '';
    }
}