import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default class AppTextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'',
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>{this.props.title}</Text>
                <TextInput
                {...this.props}
                style={styles.input}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                underlineColorAndroid='transparent'
                secureTextEntry={this.props.password}
                />
            </View>
        );
    }
    
}

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input: {
        width:250,
        paddingVertical: 5,
        marginBottom: 15,
        marginTop:0,
        borderBottomColor:"$inputUnderlineColor",
        borderBottomWidth:1
    },
    text:{
        marginBottom:-5
    }
});
