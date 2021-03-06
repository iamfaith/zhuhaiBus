/**
 * Created by faith on 2017/3/17.
 */
export default class Define {

    static URLS = {
        ZHBusStationQry: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&key=', //key = 3
        ZHBusStationDetail: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetStationList&lineId=',
        ZHBusInfo: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetBusListOnRoad',
        ZHGetLineListByLineName: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&key=',
    }


    static String = {
        SearchBus: '查询',
        PLS_INPUT_BUS: '请输入公交线路',
        INPUT_INVALID: '输入有误，请重新输入数字或者字母',
        NO_BUS_ALAIABLE: '该线路公交不在运营或者输入有误',
        NO_BUS: '找不到该公交线路',
        SEARCH: '查询',
        CLOCK: '实时',
        CHANGE_LINE: '切换',
        SEARCH_FIRST: '请先点击查询再进行切换路线',
        REAL_TIME_SEARCH: '实时查询',
        TRANSFER_BUS: '换乘查询',
        SEARCH_GOV_BIKE: '绿色出行',
        SETTING: '设置',
        SHARE: '分享',
        CONTACTME: '联系和反馈',
        // WORKING_BUS: `(${busSum}辆公交在行驶中)`,
        // BUS_INFO: `首班车: ${busInfo.beginTime} 末班车: {$busInfo.endTime} 票价: {busInfo.price}元`
    }
}