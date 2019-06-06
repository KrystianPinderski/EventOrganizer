import React, { PureComponent } from 'react';
import {
    View,
    ScrollView,
    Text,
    Picker
} from 'react-native';
import EStylesSheet from 'react-native-extended-stylesheet';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import ApiHandler from '../../API/ApiHandler';
import { Actions } from 'react-native-router-flux';

export default class extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            type: '',
            adress: '',
            companyName: '',
            KRSNumber: '',
            NIPNumber: '',
            REGONNumber: '',
        };
    }
    signIn = async () => {
        const { login, password, type, adress, companyName, KRSNumber, NIPNumber, REGONNumber } = this.state
        if (type === "admin") {
            try {
                await ApiHandler.signIn(login, password, type, adress, companyName, KRSNumber, NIPNumber, REGONNumber)
                    .then(function (response) {
                        if (response.status === 201) {
                            Actions.login();
                            return alert("Added Admin.")
                        }
                    }).catch(function (err) {
                        switch (err.response.status) {
                            case 404:
                                return alert("User not found.")
                            default: alert("sth goes wrong.")
                        }
                    })
            } catch (err) {
                console.log("ERRRORRRRR");
                throw err;
            }

        } else {
            await ApiHandler.signIn(login, password, type).then(function (response) {
                if (response.status === 201) {
                    Actions.login();
                    return alert("Added user.")
                }
            }).catch(function (error) {
                switch (error.response.status) {
                    case 404:
                        return alert("User not found.")
                    default: alert("Sth goes wrong.")
                }
            });
        }
    }
    addAdmin = () => {
        if (this.state.type === "admin") {
            return (
                <View>
                    {/* TODO Ramka prawo gora lewo taki sam odstep*/}
                    <AppTextInput
                        title="Adress:"
                        onChangeText={(adress) => this.setState({ adress })}
                        value={this.state.adress}
                    />
                    <AppTextInput
                        title="Company Name:"
                        onChangeText={(companyName) => this.setState({ companyName })}
                        value={this.state.companyName}
                    />
                    <AppTextInput
                        title="KRS:"
                        onChangeText={(KRSNumber) => this.setState({ KRSNumber })}
                        value={this.state.KRSNumber}
                    />
                    <AppTextInput
                        title="NIP:"
                        onChangeText={(NIPNumber) => this.setState({ NIPNumber })}
                        value={this.state.NIPNumber}
                    />
                    <AppTextInput
                        title="REGON:"
                        onChangeText={(REGONNumber) => this.setState({ REGONNumber })}
                        value={this.state.REGONNumber}
                    />
                </View>
            )
        }
        return;
    }
    render() {
        console.log(this.state.type)
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <AppTextInput
                        title="Login:"
                        onChangeText={(login) => this.setState({ login })}
                        value={this.state.login}
                    />
                    <AppTextInput
                        title="Password:"
                        password
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Text>User Type:</Text>
                    <Picker
                        selectedValue={this.state.type}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ type: itemValue })
                        }>
                        <Picker.Item label="User" value="user" />
                        <Picker.Item label="Admin" value="admin" />
                    </Picker>
                    {this.addAdmin()}
                    <AppButton onPress={this.signIn} text="Sign In" />
                </View>
            </ScrollView >
        );
    }

}

const styles = EStylesSheet.create({
    scrollView: {
        padding: 24,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
    }
});
