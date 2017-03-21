/**
 * Created by faith on 2017/3/17.
 */
import config from '../../res/data/Config.json';
export default class HttpClient {

    static defaultProps = {
        header: config.header
    }

    constructor(prop) {
        this.url = prop.url;
        this.method = prop.method;
        if (prop.header != undefined)
            this.header = prop.header;
        else
            this.header = HttpClient.defaultProps.header;

        if (prop.body != undefined) {
            this.body = prop.body;
        }
    }

}