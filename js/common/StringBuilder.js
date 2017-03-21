/**
 * Created by faith on 2017/3/20.
 */
export default class StringBuilder {
    constructor(prop) {
        this._strings = []
    }

    append(str) {
        this._strings.push(str)
    }

    toString() {
        return this._strings.join('')
    }
}