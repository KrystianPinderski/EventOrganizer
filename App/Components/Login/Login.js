import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import AppButton from '../AppButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiHandler from '../../API/ApiHandler';
import { Actions } from 'react-native-router-flux';
import AppTextInput from '../AppTextInput';
import AsyncStorage from '@react-native-community/async-storage';

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
                    await AsyncStorage.setItem('User', JSON.stringify({ token, name: result.name, password: result.password, type: result.type }))
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
            <View style={styles.contentContainer}>
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
                        <Text>Dont have account yet? </Text>
                        <Text>SignIn now !</Text>
                    </TouchableOpacity>

                    <View style={styles.phoneCall}>
                        <Text>Having trouble?</Text>
                        <Text>call:XXX-XXX-XXX</Text>
                    </View>
                </View>
            </View>
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
        alignItems: 'flex-end'
    }
});
