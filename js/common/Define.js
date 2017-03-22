/**
 * Created by faith on 2017/3/17.
 */
export default class Define {

    static URLS = {
        ZHBusStationQry: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&key=', //key = 3
        ZHBusStationDetail: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetStationList&lineId=',
        ZHBusInfo: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetBusListOnRoad'
    }


    static String = {
        SearchBus : '查询',
        PLS_INPUT_BUS: '请输入公交线路',
        INPUT_INVALID : '输入有误，请重新输入数字或者字母',
        NO_BUS_ALAIABLE : '该线路公交不在运营',
        NO_BUS : '找不到该公交线路',
        SEARCH:'查询',
        CHANGE_LINE:'切换',
        SEARCH_FIRST: '请先点击查询再进行切换路线',
        // WORKING_BUS: `(${busSum}辆公交在行驶中)`,
        // BUS_INFO: `首班车: ${busInfo.beginTime} 末班车: {$busInfo.endTime} 票价: {busInfo.price}元`
    }
}