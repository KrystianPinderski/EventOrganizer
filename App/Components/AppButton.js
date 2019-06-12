import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class AppButton extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.touchableOpacity,{backgroundColor:this.props.backgroundColor?this.props.backgroundColor:EStyleSheet.value('$buttonColor')}]}
                    onPress={this.props.onPress}>
                    <Text style={[styles.buttonText,{color:this.props.textColor}]}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = EStyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
    }
});
