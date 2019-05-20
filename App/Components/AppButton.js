import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default class AppButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return (
            <View style={styles.buttonContainer}>
               <TouchableOpacity
               style={styles.touchableOpacity}
               onPress={this.props.onPress}>
                   <Text style={styles.buttonText}>{this.props.text}</Text>
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
    touchableOpacity:{
        paddingVertical:12,
        paddingHorizontal:24,
        backgroundColor:'#FFFF00',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
    },
    buttonText:{
        fontSize:18,
    }
});
