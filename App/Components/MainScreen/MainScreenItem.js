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
    
    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        return (
            <View >
                <TouchableOpacity
                        style={styles.touchableItem}
                        onPress={this.props.onPress}
                    >
                        <Text style={styles.touchableItemText}>{this.props.title}</Text>
                    </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = EStyleSheet.create({
    touchableItem: {
        width: 130,
        height: 130,
        borderRadius: 15,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        margin:5
    },
    touchableItemText: {
        fontSize: 25
    }
});
