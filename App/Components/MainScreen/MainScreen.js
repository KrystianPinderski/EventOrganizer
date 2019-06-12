import React, { PureComponent } from 'react';
import {
    ScrollView,
    ImageBackground,
    View,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import MainScreenItem from './MainScreenItem';
import Background from '../../Images/BGMainScreen.jpg';
const arrowColors=[
    "#EB0059",
    "#E16328",
    "#FBD700",
    "#00BE2A",
    "#005DDE",
    "#9544C4"
]
const iconColors=[
    "#DB0049",
    "#D15318",
    "#EBC700",
    "#00AE1A",
    "#004DCE",
    "#8524B4"
]
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
    goToEventsByTag = () => {
        Actions.eventsByTag();
    }

    logout = () => {
        Actions.replace("login");
        AsyncStorage.removeItem("User");
    }

    admin() {
        if (this.state.userInfo.type == "admin") {
            return (
                <MainScreenItem iconBackground={iconColors[0]} arrowBackground={arrowColors[0]} title="Add Event"
                    onPress={this.goToAddEvent}
                />
            )
        }
    }

    render() {
        return (
            <ImageBackground source={Background} style={[styles.fixed,styles.backgroundContainer]}>
                <ScrollView overScrollMode='never'style={[styles.fixed,styles.container]}>
                    <View style={styles.itemContainer}>
                        {this.admin()}
                        <MainScreenItem iconBackground={iconColors[1]} arrowBackground={arrowColors[1]} title="Find by Tags"
                            onPress={this.goToEventsByTag}
                        />
                        <MainScreenItem iconBackground={iconColors[2]}  arrowBackground={arrowColors[2]} title="Settings"
                            onPress={this.goToSettings}
                        />
                        <MainScreenItem iconBackground={iconColors[3]} arrowBackground={arrowColors[3]} title="Settings"
                            onPress={this.goToSettings}
                        />
                        <MainScreenItem iconBackground={iconColors[4]} arrowBackground={arrowColors[4]} title="Logout"
                            onPress={this.logout}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginTop:80,
        marginBottom:70
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundContainer:{
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    }
});