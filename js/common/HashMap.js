/**
 * Created by faith on 2017/3/20.
 */
export default class HashMap {

    set(key, value) {
        this[key] = value
    }

    get(key) {
        return this[key]
    }

    contains(key) {
        return this.Get(key) == null ? false : true
    }

    remove(key) {
        delete this[key];
    }
}

