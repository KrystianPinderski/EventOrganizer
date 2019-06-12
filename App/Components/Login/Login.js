import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import AppButton from '../AppButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiHandler from '../../API/ApiHandler';
import { Actions } from 'react-native-router-flux';
import AppTextInput from '../AppTextInput';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../../Images/BGLogin.jpg';

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }
    login = async () => {
        await ApiHandler.login(this.state.login, this.state.password).then(async function (response) {
            if (response.status == 200) {
                let { token, result } = response
                try {
                    await AsyncStorage.setItem('User', JSON.stringify({ token, name: result.name, password: result.password, type: result.type, companyName: result.companyName }))
                    Actions.replace("mainScreen", { response });
                } catch (e) {
                    console.log(e)
                }
            }
        }).catch(function (error) {
            switch (error.response.status) {
                case 404:
                    return alert("User not found.")
                default: alert("Sth goes wrong.")
            }
        });
    }

    signIn = () => {
        Actions.addUser();
    }

    render() {
        return (
            <ImageBackground source={Background} style={styles.contentContainer}>
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
                    </View>

                    <View>
                        <AppButton onPress={this.login} text={"Login"} />
                    </View>
                </View>
                <View style={styles.bottomHelpersContainer}>
                    <TouchableOpacity style={styles.signIn} onPress={this.signIn}>
                        <Text style={styles.textBottom}>Don't have account yet? </Text>
                        <Text style={styles.textBottom}>Sign In now!</Text>
                    </TouchableOpacity>

                    <View style={styles.phoneCall}>
                        <Text style={styles.textBottom}>Having trouble?</Text>
                        <Text style={styles.textBottom}>call:XXX-XXX-XXX</Text>
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
        justifyContent: 'space-evenly',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    bottomHelpersContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    signIn: {
        flex: 1,
    },
    phoneCall: {
        flex: 1,
        alignItems: 'flex-end',
    },
    textBottom: {
        color: 'white'
    }
});
