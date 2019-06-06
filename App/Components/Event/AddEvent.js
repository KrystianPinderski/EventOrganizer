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
import Tags from 'react-native-tags';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHandler from '../../API/ApiHandler';
let kolos = []
export default class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            organizer: '',
            city: '',
            description: '',
        };
    }
    sendForm = async () => {
        let user = JSON.parse(await AsyncStorage.getItem("User"))
        await ApiHandler.addEvent(this.state.title, this.state.date,user.companyName,this.state.city,this.state.description,kolos).then(async function (response) {
            if (response.status == 201) {
                alert("Added Event.")
            }
        }).catch(function (error) {
            switch (error.response.status) {
                case 404:
                    return alert("User not found.")
                default: alert("Sth goes wrong.")
            }
        });
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
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.content}>
                    <AppTextInput
                        title="Event Name:"
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                        placeholder="Here event name"
                    />
                    <View >
                        <Text>Event Date :</Text>
                        <TouchableOpacity
                            style={styles.datePicker}
                            onPress={this.datePicker}
                        >
                            <Text>{this.state.date !== "" ? this.state.date.toISOString().slice(0, 10) : "Choose Date"}</Text>
                        </TouchableOpacity>
                    </View>
                    <AppTextInput
                        title="City:"
                        onChangeText={(city) => this.setState({ city })}
                        value={this.state.city}
                        placeholder="Type City here."
                    />
                    <AppTextInput
                        title="Description:"
                        multiline={true}
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                        placeholder="Add..."
                    />
                    <Text >Tags:</Text>
                    <Tags
                        style={{ flex: 1, flexDirection: 'column', marginVertical: 10 }}
                        initialText=""
                        textInputProps={{
                            placeholder: "Add tags here"
                        }}
                        initialTags={[]}
                        onChangeTags={tags => {
                            kolos = tags
                        }}
                        maxNumberOfTags={10}
                        tagContainerStyle={{ width: 250, flexDirection: 'row' }}
                        containerStyle={{ flexDirection: 'row', justifyContent: "center", flex: 1 }}
                        inputStyle={styles.tagInputStyle}
                        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tagsContainer}>
                                <Text style={{ color: 'white' }}>{tag + " "}</Text><Text style={{ color: 'red' }}>X</Text>
                            </TouchableOpacity>
                        )}
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
        backgroundColor: '$buttonColor',
        width: 250,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 0
    },
    tagsContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        minWidth: 70,
        minHeight: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#30D5C8',
        paddingHorizontal: 7,
    },
    tagInputStyle: {
        minWidth: 250,
        maxHeight: 50,
        marginTop: 0,
        borderBottomColor: "$inputUnderlineColor",
        borderBottomWidth: 1,
        backgroundColor: 'lightgrey'
    }
});
