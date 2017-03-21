/**
 * Created by faith on 2017/3/20.
 */
import React, {Component} from 'react-native';
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

    componentDidMount() {
        setTimeout(() => {
            this.state.toast = {
                visible: false,
            };
            this.setState(this.state);
        }, 600);
    };

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