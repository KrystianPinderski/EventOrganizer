import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            let position = JSON.parse(await AsyncStorage.getItem("UserLocation"))
            console.log(position)
            this.setState({ latitude: position.position.coords.latitude, longitude: position.position.coords.longitude })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>User Latitude: {this.state.latitude}</Text>
                <Text>User Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }
}

export default Test;