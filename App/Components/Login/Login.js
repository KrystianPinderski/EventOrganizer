import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground, Dimensions, ActivityIndicator
} from 'react-native';
import AppButton from '../AppButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiHandler from '../../API/ApiHandler';
import { Actions } from 'react-native-router-flux';
import AppTextInput from '../AppTextInput';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../../Images/BGLogin.jpg';
import { getStatus } from '../../CheckConnection';

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            loading: false,
            connection: false,
        };
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                AsyncStorage.setItem("UserLocation", JSON.stringify({ position }))
            },
            (error) => this.setState({ error: error.message }),
            { timeout: 5000, maximumAge: 1000 },
        );
    }
    login = async () => {
        this.setState({ loading: true })
        let connection = await getStatus()
        if (!connection) {
            this.setState({ loading: false })
            alert("No internet connection.")
        } else {
            try {
                await ApiHandler.login(this.state.login, this.state.password).then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        let { token, result } = response
                        try {
                            await AsyncStorage.setItem('User', JSON.stringify({ token, name: result.name, password: result.password, type: result.type, companyName: result.companyName }))
                            Actions.replace("mainScreen", { response })
                        } catch (e) {
                            throw e;
                        }
                    }
                }).catch((error) => {
                    if (error.response.status == 404) {
                        alert("User not found.")
                    } else {
                        alert("Sth goes wrong.")
                    }
                    this.setState({ loading: false })
                });
            } catch (e) {
                throw e;
            }
        }
    }

    signIn = () => {
        Actions.addUser();
    }

    render() {
        return (
            <ImageBackground source={Background} style={styles.contentContainer}>
                {this.state.loading ? <View style={styles.inputContainer}><ActivityIndicator size="large" color="#00ff00" /></View> :
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <AppTextInput
                                title="Login:"
                                onChangeText={(login) => this.setState({ login })}
                                value={this.state.login} />
                            <AppTextInput
                                title="Password:"
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                password />
                            <AppButton textColor="white" onPress={this.login} text={"Login"} />
                        </View>
                    </View>
                }

                <View style={styles.bottomHelpersContainer}>

                    <View style={styles.signInContainer}>
                        <TouchableOpacity style={styles.signIn} onPress={this.signIn}>
                            <Text style={styles.textBottom}>Don't have account yet? </Text>
                            <Text style={styles.textBottom}>Sign In now!</Text>
                        </TouchableOpacity>
                        <View style={styles.signInAfter} />
                    </View>
                    <View style={styles.phoneCallContainer}>
                        <View style={styles.phoneCallBefore} />
                        <View style={styles.phoneCall}>
                            <Text style={styles.textBottom}>Having trouble?</Text>
                            <Text style={styles.textBottom}>call:XXX-XXX-XXX</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        );
    }
}

const styles = EStyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '$padding',
        backgroundColor: '$backgroundColor'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    bottomHelpersContainer: {
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    signIn: {
        height: 40,
        width: Dimensions.get("window").width * 0.45,
        backgroundColor: '$buttonColor',
        padding: 2
    },
    phoneCall: {
        height: 40,
        width: Dimensions.get("window").width * 0.45,
        backgroundColor: '$buttonColor',
        padding: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    textBottom: {
        color: 'white'
    },
    phoneCallContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    signInContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    signInAfter: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: Dimensions.get("window").width * 0.05,
        borderTopWidth: 40,
        borderRightColor: 'transparent',
        borderTopColor: '$buttonColor'
    },
    phoneCallBefore: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: Dimensions.get("window").width * 0.05,
        borderBottomWidth: 40,
        borderLeftColor: 'transparent',
        borderBottomColor: '$buttonColor'
    }
});
