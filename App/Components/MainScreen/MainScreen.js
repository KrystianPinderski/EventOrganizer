import React, { PureComponent } from 'react';
import {
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import MainScreenItem from './MainScreenItem';

export default class MainScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        };
    }
    async componentWillMount() {
        try {
            let value = JSON.parse(await AsyncStorage.getItem("User"))
            console.log(value)
            if (value !== null) {
                this.setState({ userInfo: value })
            }
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {

    }

    goToSettings = () => {
        Actions.settings();
    }

    goToAddEvent = () => {
        Actions.addEvent();
    }

    logout = () => {
        Actions.replace("login");
        AsyncStorage.removeItem("User");
    }

    admin() {
        if (this.state.userInfo.type == "admin") {
            return (
                <MainScreenItem title="Add Event"
                    onPress={this.goToAddEvent}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    {this.admin()}
                    <MainScreenItem title="Settings"
                        onPress={this.goToSettings}
                    />
                    <MainScreenItem title="Logout"
                        onPress={this.logout}
                    />
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        padding: '$padding',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    }

});