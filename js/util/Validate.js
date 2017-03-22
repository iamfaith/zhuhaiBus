/**
 * Created by faith on 2017/3/20.
 */
export default class InputValidate {

    static checkNumAndLetter(value) {
        let regx = /^[A-Za-z0-9]*$/;
        if (regx.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 纯数字
     * @param value
     */
    static checkNum(value) {
        let regx = /^[0-9]*$/;
        if (regx.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }

}