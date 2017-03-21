/**
 * Created by faith on 2017/3/17.
 */
import Define from '../common/Define'
import HttpClient from '../common/HttpClient'
import StringBuilder from '../common/StringBuilder'
export default class BusQry {

    static qryBusStation(busStation = null) {
        let prop = {
            url: Define.URLS.ZHBusStationQry + busStation,
            method: 'GET'
        }
        let httpClient = new HttpClient(prop);
        return httpClient;
    }

    static qryBusStationDetail(id = null) {
        let prop = {
            url: Define.URLS.ZHBusStationDetail + id,
            method: 'GET'
        }
        let httpClient = new HttpClient(prop);
        return httpClient;
    }

    static qryBusInfo(params = null) {
        let url = Define.URLS.ZHBusInfo;
        if (params != null) {
            let queryString = new StringBuilder();

            let keys = Object.keys(params);
            let keyLen = keys.length;
            if (keys != null && keyLen > 0) {
                for (let i = 0; i < keyLen; i++) {
                    let key = keys[i];
                    queryString.append(key + "=" +  params[key])
                    if (i < keyLen - 1)
                        queryString.append("&");
                }
            }
            url += "&" + queryString.toString();
        }

        let prop = {
            url: url,
            method: 'GET'
        }
        let httpClient = new HttpClient(prop);
        return httpClient;
    }

}