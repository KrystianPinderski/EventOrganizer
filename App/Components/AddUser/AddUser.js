import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


export default class  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
