import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    DatePickerAndroid,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import moment from 'moment'
import EStyleSheet from 'react-native-extended-stylesheet';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import Tags from 'react-native-tags';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHandler from '../../API/ApiHandler';
import Event from '../../Images/BGEvent.jpg';
import { getStatus } from '../../CheckConnection';
let tagsTab = []
export default class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            organizer: '',
            city: '',
            street: '',
            description: '',
            link: '',
            loading: false,
            tagsTab:[]
        };
    }

    sendForm = async () => {
        let userData = JSON.parse(await AsyncStorage.getItem("User"))
        const { link, title, date, city, street, description, } = this.state
        console.log("Send Form Date: ", date)
        let resultTab;
        await ApiHandler.getCityPosition(city, street).then(function (response) {
            resultTab = response
        }).catch(function (err) {
            console.log("Error", err)
        })
        if (link.toUpperCase().startsWith("HTTPS://WWW.") ||
            link.toUpperCase().startsWith("HTTP://WWW.") ||
            link === "") {
            let connection = await getStatus()
            if (resultTab.length <= 0) {
                return alert("Can't find city or street.")
            }
            if (!connection) {
                alert("No internet connection.")
            } else {
                this.setState({ loading: true })
                await ApiHandler.addEvent(title, date, userData.companyName, city, street, resultTab[0].lon, resultTab[0].lat, description, tagsTab, link).then(async function (response) {
                    if (response.status == 201) {
                        try {
                            await ApiHandler.getEvents(userData.token)
                                .then(function (response) {
                                    if (response.status === 200) {
                                        let result = response.result
                                        AsyncStorage.setItem('Events', JSON.stringify({ result }))
                                    }
                                }).catch(function (err) {
                                    switch (err.response.status) {
                                        case 404:
                                            return alert("User not found.")
                                        case 401:
                                            return alert("Please log in again.")
                                        default: alert("sth goes wrong.")
                                    }
                                })
                        } catch (err) {
                            console.log(err)
                        }
                        alert("Added Event.")
                    }
                }).catch(function (error) {
                    if (error.response.status == 500) {
                        let bug = error.response.data.error.errors
                        if (bug.title && bug.title.message) {
                            alert("Title required.")
                        }
                        if (bug.city && bug.city.message) {
                            alert("City required.")
                        }
                        if (bug.description && bug.description.message) {
                            alert("Description required.")
                        }
                    } else if (error.response.status == 404) {
                        alert("Please log in again.")
                    } else {
                        alert("Something went wrong.")
                    }

                })
                this.setState({ loading: false, title: "", date: "", city: "", street: "", description: "", link: "" ,tagsTab:[]})
                tagsTab = []
                resultTab = []
            }
        } else {
            alert("Link must start with Http or Https://www.")
        }
    }

    datePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day, "01")
                this.setState({ date })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <ImageBackground source={Event} style={{ flex: 1 }}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#00BE2A" />
                    </View>
                </ImageBackground>
            )
        }
        console.log(this.state.title)
        return (
            <ImageBackground source={Event} style={{ flex: 1 }}>
                <ScrollView style={styles.mainContainer} >
                    <View style={styles.content}>
                        <AppTextInput
                            title="Event Name:"
                            onChangeText={(title) => this.setState({ title })}
                            value={this.state.title}
                            placeholder="Here event name"
                        />
                        <View >
                            <Text >Event Date :</Text>
                            <TouchableOpacity
                                style={styles.datePicker}
                                onPress={this.datePicker}
                            >
                                <Text >{this.state.date !== "" ? moment(this.state.date).format("DD-MM-YYYY") : "Choose Date"}</Text>
                            </TouchableOpacity>
                        </View>
                        <AppTextInput
                            title="City"
                            onChangeText={(city) => this.setState({ city })}
                            value={this.state.city}
                        />
                        <AppTextInput
                            title="Street"
                            onChangeText={(street) => this.setState({ street })}
                            value={this.state.street}
                        />
                        <AppTextInput
                            title="Description:"
                            multiline={true}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                            placeholder="Add..."
                        />
                        <AppTextInput
                            title="Link:"
                            onChangeText={(link) => { this.setState({ link }) }}
                            value={this.state.link}
                            placeholder="Link to event."
                        />
                        <Text >Tags:</Text>
                        <Tags
                            style={{ flex: 1, flexDirection: 'column', marginVertical: 10 }}
                            initialText=""
                            textInputProps={{
                                placeholder: "Add tags here"
                            }}
                            initialTags={this.state.tagsTab}
                            onChangeTags={tags => {
                                tagsTab = tags
                                this.setState({tagsTab})
                            }}
                            maxNumberOfTags={10}
                            tagContainerStyle={{ width: 250, flexDirection: 'row' }}
                            containerStyle={{ flexDirection: 'row', justifyContent: "center", flex: 1 }}
                            inputStyle={styles.tagInputStyle}
                            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => this.state.tagsTab.length > 0 ? (
                                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tagsContainer}>
                                    <Text style={{ color: 'white' }}>{tag + " "}</Text><Text style={{ color: 'red' }}>X</Text>
                                </TouchableOpacity>
                            ) : null}
                        />
                        <AppButton text="Add Event" onPress={this.sendForm} />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

}

const styles = EStyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
    },
    content: {
        marginVertical: 36,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    datePicker: {
        backgroundColor: '$buttonColor',
        width: '$inputWidth',
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
        minWidth: '$inputWidth',
        maxHeight: 50,
        marginTop: 0,
        borderBottomColor: "$inputUnderlineColor",
        borderBottomWidth: 1,
        backgroundColor: 'lightgrey'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }
});
