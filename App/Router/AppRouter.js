import React, { PureComponent } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import AddUser from '../Components/AddUser/AddUser';
import Login from '../Components/Login/Login';
import MainScreen from '../Components/MainScreen/MainScreen';
import AddEvent from '../Components/Event/AddEvent';
import TagsEvent from '../Components/Event/TagsEvent';
export default class AppRouter extends PureComponent {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="login"
                        component={Login}
                        title="Event Organizer"
                        
                    />
                    <Scene
                        key="addUser"
                        component={AddUser}
                        title="Add User"
                        
                    />
                    <Scene
                        key="mainScreen"
                        component={MainScreen}
                        title={"Welcome"}
                        hideNavBar
                        
                    />
                    <Scene
                        key="addEvent"
                        component={AddEvent}
                        title={"Add event"}
                        
                    />
                    <Scene
                        key="eventsByTag"
                        component={TagsEvent}
                        title={"Find by tag"}
                        initial
                    />
                </Scene>
            </Router>
        );
    }

}
