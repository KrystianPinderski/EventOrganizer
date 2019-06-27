import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class MainScreenItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View >
                <TouchableOpacity
                    style={styles.touchableItem}
                    onPress={this.props.onPress}
                >
                    <View style={[styles.touchableIcon,{backgroundColor:this.props.iconBackground}]}></View>
                    <View style={[styles.touchableCenter, { backgroundColor: this.props.arrowBackground }]}>
                        <Text style={styles.touchableItemText}>{this.props.title}</Text>
                    </View>
                    <View style={[styles.triangle, { borderBottomColor: this.props.arrowBackground }]}></View>
                </TouchableOpacity>
            </View>
        );
    }

}
const containerSize = 50;
const containerWidth = 260;
const styles = EStyleSheet.create({
    touchableItem: {
        flexDirection: 'row',
        width: containerWidth,
        height: containerSize,
        marginVertical: 10
    },
    touchableCenter: {
        width: containerWidth - (containerSize * 2),
        height: containerSize,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    touchableItemText: {
        alignSelf: 'center',
        fontSize: 15,
        flexWrap: 'wrap',
        color: "white"
    },
    touchableIcon: {
        width: containerSize,
        height: containerSize,
        backgroundColor: "blue"
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 0.5 * containerSize,
        borderRightWidth: 0.5 * containerSize,
        borderBottomWidth: containerSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [
            { rotate: '90deg' }
        ]
    }
});
