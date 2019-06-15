import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    DatePickerAndroid,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import moment from 'moment'
import EStyleSheet from 'react-native-extended-stylesheet';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import Tags from 'react-native-tags';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHandler from '../../API/ApiHandler';
import Event from '../../Images/BGEvent.jpg';
let tagsTab = []
export default class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            organizer: '',
            city: '',
            description: '',
            link: '',
            loading: false
        };
    }
    sendForm = async () => {
        let user = JSON.parse(await AsyncStorage.getItem("User"))
        if (this.state.link.toUpperCase().startsWith("HTTPS://WWW") ||
            this.state.link.toUpperCase().startsWith("HTTP://WWW") ||
            this.state.link === "") {
            this.setState({ loading: true })
            await ApiHandler.addEvent(this.state.title, this.state.date, user.companyName, this.state.city, this.state.description, tagsTab, this.state.link).then(async function (response) {
                if (response.status == 201) {
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
            this.setState({ loading: false })
        } else {
            alert("Please type good link Http/Https://www.example.com")
        }
    }

    datePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
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
        if (this.state.loading) {
            return (
                <ImageBackground source={Event} style={{ flex: 1 }}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#00BE2A" />
                    </View>
                </ImageBackground>
            )
        }

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
                            initialTags={[]}
                            onChangeTags={tags => {
                                tagsTab = tags
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
            </ImageBackground>
        );
    }

}

const styles = EStyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
    },
    content: {
        marginVertical:36,
        paddingVertical:20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width:300,
        backgroundColor:'rgba(255,255,255,0.8)'
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
