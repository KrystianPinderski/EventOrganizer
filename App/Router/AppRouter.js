import React, { PureComponent } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import AddUser from '../Components/AddUser/AddUser';
import Login from '../Components/Login/Login';
import MainScreen from '../Components/MainScreen/MainScreen';
import AddEvent from '../Components/Event/AddEvent';
import TagsEvent from '../Components/Event/TagsEvent';
import AppMap from '../Components/Map/MapView';
import { MenuProvider } from 'react-native-popup-menu';
import Test from '../Components/Test/Test';
import AllEvents from '../Components/Event/AllEvents';
import ManageEvents from '../Components/Event/ManageEvents';
export default class AppRouter extends PureComponent {
    render() {
        return (
            <MenuProvider >
                <Router>
                    <Scene key="root">
                        <Scene
                            key="login"
                            component={Login}
                            title="Event Organizer"
                            initial
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

                        />
                        <Scene
                            key="mapView"
                            component={AppMap}
                            title="Map View"
                            hideNavBar

                        />
                        <Scene
                            key="test"
                            component={Test}
                            title="Test"
                            hideNavBar

                        />
                        <Scene
                            key="allEvents"
                            component={AllEvents}
                            title="All Events"

                        />
                        <Scene
                            key="manageEvents"
                            component={ManageEvents}
                            title="Manage Events"
                            
                        />
                    </Scene>
                </Router>
            </MenuProvider>
        );
    }

}
