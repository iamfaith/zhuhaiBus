/**
 * Created by faith on 2017/4/11.
 */
import React, {
    Component,
} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import Define from '../common/Define';
export default class MySetting extends React.Component {

    // constructor(props) {
    //     super(props);
    //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.state = {
    //         dataSource: ds.cloneWithRows([
    //             Define.String.SHARE, Define.String.CONTACTME
    //         ])
    //     };
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <Text>asd</Text>

                </View>

                <View style={styles.Body}>
                    {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={(rowData) => <Text>{rowData}</Text>}*/}
                    {/*/>*/}

                    <Text style={styles.BodyText}>{Define.String.SHARE}</Text>
                    <Text style={styles.BodyText}>{Define.String.CONTACTME}</Text>
                </View>
            </View>

        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'column',
    },

    Header: {
        flex: 2,
        backgroundColor: '#e8581b',
    },

    Body: {
        flexDirection: 'column',
        // justifyContent: 'center',
        backgroundColor: '#98948e',
        flex: 3,
    },

    BodyText: {
        fontSize: 20,
        marginTop: 4,
        backgroundColor: 'white'
    }

});