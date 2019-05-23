import React, { PureComponent } from 'react';
import {
    View,
    TextInput,
    Text,
} from 'react-native';
import AppButton from '../AppButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiHandler from '../../API/ApiHandler';
import { Actions } from 'react-native-router-flux';

export default class MainScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }
    login = async () => {
        let response = await ApiHandler.login();
        if (response.Message === "Success") {
            return alert("We go to app.");
        }
        switch (response.Message) {
            case "User Name Incorrect":
                return alert("Wrong Login.")
            case "Password Incorrect":
                return alert("Wrong Password.")
            case "Success":
                return alert("We go to app.")
            default: alert("Sth goes wrong.")
        }
    }

    signIn=()=>{
        Actions.addUser();
    }
    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.inputContainer}>
                    <Text>Login:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(login) => this.setState({ login })}
                        value={this.state.login}
                        underlineColorAndroid='#FF00FF' />
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        underlineColorAndroid='#FF00FF' />
                </View>
                <View>
                    <AppButton onPress={this.login} text={"Login"} />
                </View>
                <View>
                    <AppButton onPress={this.signIn} text={"Sing In"} />
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
        width: 200,
        justifyContent: 'space-evenly',
    },
    input: {
        padding: 5,
        marginBottom: 10,
    }
});
