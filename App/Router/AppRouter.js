import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import MainScreen from '../Components/MainScreen/MainScreen';
import AddUser from '../Components/AddUser/AddUser';

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="home"
                        component={MainScreen}
                        title="Event Organizer"
                        initial
                    />
                    <Scene
                        key="addUser"
                        component={AddUser}
                        title="Add User"
                    />
                </Scene>
            </Router>
        );
    }

}
