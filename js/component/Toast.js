/**
 * Created by faith on 2017/3/20.
 */
import React, {
    Component,
} from 'react';
import Toast from 'react-native-root-toast';

export default class BaseToast extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            toast: {
                visible: false,
                msg: '',
            }
        };
    }

    hideToast() {
        setTimeout(() => {
            this.state.toast = {
                visible: false,
            };
            this.setState(this.state);
        }, 800);
    }

    showToast(msg, isHidden = true) {
        this.state.toast = {
            visible: true,
            msg: msg,
        };
        this.setState(this.state);
        if (isHidden)
            this.hideToast();
    }

    render() {
        return (<Toast
            visible={this.state.toast.visible}
            position={Toast.positions.CENTER}
            duration={Toast.durations.LONG}
            shadow={true}
            animation={true}
            hideOnPress={true}
        >{this.state.toast.msg}</Toast>);
    }
}