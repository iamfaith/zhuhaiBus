/**
 * Created by faith on 2017/3/22.
 */
import React, {Component, PropTypes} from 'react';
import {
    ListView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

class Autocomplete extends Component {
    static propTypes = {
        ...TextInput.propTypes,
        /**
         * These styles will be applied to the container which
         * surrounds the autocomplete component.
         */
        containerStyle: View.propTypes.style,
        /**
         * Assign an array of data objects which should be
         * rendered in respect to the entered text.
         */
        data: PropTypes.array,
        /*
         * These styles will be applied to the container which surrounds
         * the textInput component.
         */
        inputContainerStyle: View.propTypes.style,
        /*
         * These styles will be applied to the container which surrounds
         * the result list.
         */
        listContainerStyle: View.propTypes.style,
        /**
         * These style will be applied to the result list.
         */
        listStyle: ListView.propTypes.style,
        /**
         * `onShowResults` will be called when list is going to
         * show/hide results.
         */
        onShowResults: PropTypes.func,
        /**
         * `renderItem` will be called to render the data objects
         * which will be displayed in the result view below the
         * text input.
         */
        renderItem: PropTypes.func,
        /**
         * `renderSeparator` will be called to render the list separators
         * which will be displayed between the list elements in the result view
         * below the text input.
         */
        renderSeparator: PropTypes.func,
        /**
         * renders custom TextInput. All props passed to this function.
         */
        renderTextInput: PropTypes.func
    };

    static defaultProps = {
        data: [],
        defaultValue: '',
        renderItem: rowData => (
            <Text>{rowData}</Text>
        ),
        renderSeparator: function (sectionID, rowID, adjacentRowHighlighted) {
            return (
                <View
                    key={`${sectionID}-${rowID}`}
                    style={{
                        height: adjacentRowHighlighted ? 4 : 1,
                        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                    }}
                />
            );
        },
        renderTextInput: props => <TextInput {...props} />
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.data),
            // resultListVisible: true,
        };
    }

    componentWillReceiveProps({data}) {
        const dataSource = this.state.dataSource.cloneWithRows(data);
        this.setState({dataSource});
    }

    /**
     * Proxy `blur()` to autocomplete's text input.
     */
    blur() {
        const {textInput} = this;
        textInput && textInput.blur();
    }

    /**
     * Proxy `focus()` to autocomplete's text input.
     */
    focus() {
        const {textInput} = this;
        textInput && textInput.focus();
    }

    clearResultList() {
        console.warn(this.state.dataSource);
        this.state.dataSource = this.state.dataSource.cloneWithRows(Autocomplete.defaultProps.data);
        this.setState(this.state.dataSource);
    }

    renderResultList() {
        const {dataSource} = this.state;
        const {listStyle, renderItem, renderSeparator} = this.props;

        return (
            <ListView
                dataSource={dataSource}
                keyboardShouldPersistTaps="always"
                renderRow={renderItem}
                renderSeparator={renderSeparator}
                style={[styles.list, listStyle]}
            />
        );
    }

    renderTextInput() {
        const {onEndEditing, renderTextInput, style} = this.props;
        const props = {
            style: [styles.input, style],
            ref: ref => (this.textInput = ref),
            onEndEditing: e => onEndEditing && onEndEditing(e),
            ...this.props
        };

        return renderTextInput(props);
    }


    render() {
        const {dataSource} = this.state;
        const {
            containerStyle,
            inputContainerStyle,
            listContainerStyle,
            onShowResults
        } = this.props;
        const showResults = dataSource.getRowCount() > 0;

        // Notify listener if the suggestion will be shown.
        onShowResults && onShowResults(showResults);

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.inputContainer, inputContainerStyle]}>
                    {this.renderTextInput()}
                </View>
                <View style={listContainerStyle}>
                    {showResults && this.renderResultList()}
                </View>
            </View>
        );
    }
}

const border = {
    borderColor: '#b9b9b9',
    borderRadius: 1,
    borderWidth: 1
};

const androidStyles = {
    container: {
        // flex: 1
    },
    inputContainer: {
        ...border,
        marginBottom: 0
    },
    list: {
        ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        margin: 10,
        marginTop: 0
    }
};

const iosStyles = {
    container: {
        zIndex: 1
    },
    inputContainer: {
        ...border
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 3
    },
    list: {
        ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        left: 0,
        position: 'absolute',
        right: 0
    }
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 3
    },
    ...Platform.select({
        android: {...androidStyles},
        ios: {...iosStyles}
    })
});

export default Autocomplete;