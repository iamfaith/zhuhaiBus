/**
 * Created by faith on 2017/3/18.
 */
export default class BusStation {

    constructor(prop) {
        this.id = prop.Id;
        this.name = prop.Name;
        this.price = prop.Price;
        this.fromStation = prop.FromStation;
        this.toStation = prop.ToStation;
        this.beginTime = prop.BeginTime;
        this.endTime = prop.EndTime;
    }
}