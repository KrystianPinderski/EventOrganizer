import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    DatePickerAndroid
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';

export default class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            organizer: '',
            city: '',
            description: '',
            tags: ''
        };
    }

    sendForm = () => {
        console.log("Send")
    }

    datePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day)
                this.setState({ date })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        console.log(this.state.date)
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.content}>
                    <AppTextInput
                        title="Event Name:"
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                    />
                    <TouchableOpacity
                        style={styles.datePicker}
                        onPress={this.datePicker}
                    >
                        <Text>{this.state.date !== "" ? this.state.date.toISOString().slice(0,10) : "Choose Date"}</Text>
                    </TouchableOpacity>
                    <AppTextInput
                        title="City:"
                        onChangeText={(city) => this.setState({ city })}
                        value={this.state.city}
                    />
                    <AppTextInput
                        title="Description:"
                        multiline={true}
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />
                    <AppButton text="Add Event" onPress={this.sendForm} />
                </View>
            </ScrollView>
        );
    }

}

const styles = EStyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
    },
    content: {
        padding: '$padding',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePicker: {
        backgroundColor: "yellow",
        width: 200,
        padding: 10,
        marginVertical:10,
        marginHorizontal:5
    }
});
