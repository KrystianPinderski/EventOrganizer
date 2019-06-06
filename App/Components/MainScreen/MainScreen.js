import React, { PureComponent } from 'react';
import {
    View,
    ScrollView
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
            let userData = JSON.parse(await AsyncStorage.getItem("User"))
            if (userData !== null) {
                this.setState({ userInfo: userData })
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
    goToEventsByTag = ()=>{
        Actions.eventsByTag();
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
            <ScrollView style={styles.container}>
                {/*TODO ScrollView*/}
                <View style={styles.itemContainer}>
                    {this.admin()}
                    <MainScreenItem title="Find by Tags"
                        onPress={this.goToEventsByTag}
                    />
                    <MainScreenItem title="Settings"
                        onPress={this.goToSettings}
                    />
                    <MainScreenItem title="Settings"
                        onPress={this.goToSettings}
                    />
                    
                    <MainScreenItem title="Logout"
                        onPress={this.logout}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginVertical:15
    }

});