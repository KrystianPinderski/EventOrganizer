import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Linking
} from 'react-native';
import ApiHandler from '../../API/ApiHandler';
import AsyncStorage from '@react-native-community/async-storage';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import { _ } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import Search from '../../Images/Search.jpg';
import moment from 'moment';
let events = [];
export default class TagsEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tag: 'Kij',
            toShow: [],
            showDetails: false,
            pressedIndex: 0,
            emptyFlatList: "Find sth.",
            events: null
        };
    }

    async componentWillMount() {
        let userData = JSON.parse(await AsyncStorage.getItem("User"))
        try {
            await ApiHandler.getEvents(userData.token)
                .then(function (response) {
                    if (response.status === 200) {
                        events = response.result
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
        this.setState({ events, loading: false })
    }

    showList = () => {
        if (this.state.showDetails === true) {
            this.setState({ showDetails: false })
        }
        let toFind = this.state.tag;
        let tabToSearch = this.state.events;
        let resultTab = [];
        if (this.state.toShow.length > 0) {
            this.setState({ toShow: [] })
        }
        _.forEach(tabToSearch, function (value, key) {
            if (_.includes(value.tags, toFind)) {
                let dateCompare=moment(value.date).isSameOrAfter(new Date())
                if(dateCompare){
                    resultTab.push(value)
                }
            }
        });
        if (resultTab.length > 0) {
            resultTab.sort(function (a, b) {
                var c = new Date(a.date);
                var d = new Date(b.date);
                return c - d;
            });
            this.setState({ toShow: resultTab })
        } else {
            this.setState({ emptyFlatList: "Nothing found." })
        }
    }

    show(index) {
        if (this.state.showDetails === false) {
            this.setState({ showDetails: true, pressedIndex: index })
        } else if (this.state.pressedIndex != index) {
            this.setState({ showDetails: true, pressedIndex: index })
        } else {
            this.setState({ showDetails: false })
        }
    }

    _goToURL(link) {
        link = link.toLowerCase()
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        });
    }

    showDetails(events) {
        if (this.state.showDetails === true) {
            if (this.state.pressedIndex === events.index) {
                return (
                    <View style={{
                        backgroundColor: '#460D71',
                        marginTop: -8,
                        marginBottom: 5,
                        padding: 8,
                        width: 280 - 10,
                        alignSelf: 'center',
                        zIndex: 1
                    }}>
                        <Text style={styles.descriptionContainerText}>
                            City: {events.item.city}
                        </Text>
                        <Text style={styles.descriptionContainerText}>
                            Organizer: {events.item.organizer}
                        </Text>
                        <Text style={styles.descriptionContainerText}>
                            Description: {events.item.description}
                        </Text>
                        {events.item.link ?
                            <Text style={styles.linkText} onPress={() => this._goToURL(events.item.link)}>
                                Link: {events.item.link}
                            </Text>
                            : null
                        }
                        <Text style={styles.descriptionContainerText}>Tags:</Text>
                        <FlatList
                            style={{ flexDirection: 'row', flex: 1 }}
                            keyExtractor={(tags, index) => tags}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            data={events.item.tags}
                            renderItem={(tags) => {
                                return (
                                    <Text style={{ minWidth: 30, maxWidth: 70, borderRadius: 5, padding: 5, margin: 2, backgroundColor: 'white', color: "rgb( 102,45,145)" }}>{tags.item}</Text>
                                )
                            }}
                        />
                    </View>
                )
            }
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <Text >Loading...</Text>
            )
        }
        return (
            <ImageBackground source={Search} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <AppTextInput
                        onChangeText={(tag) => this.setState({ tag })}
                        value={this.state.tag}
                        width={300}
                        placeholder="Type tag here and press Search"
                        textColor="white"
                        underlineColor='rgba(255,255,255,0.3)'
                        placeholderTextColor="white"
                    />
                    <AppButton backgroundColor='#00BE2A' text="Search" textColor='white' onPress={this.showList} />
                    <FlatList
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: "center",
                            marginVertical: 10,
                            paddingBottom: 30
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <Text style={styles.text}>{this.state.emptyFlatList}</Text>
                            )
                        }}
                        style={styles.flatList}
                        keyExtractor={(events, index) => events._id}
                        data={this.state.toShow}
                        renderItem={(events) => {
                            let event = events.item
                            return (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.show(events.index)}
                                        style={styles.touchableContainer}
                                    >
                                        <View style={styles.touchableItemsContainer}>
                                            <Text style={[{ fontSize: 16 }, styles.text]}>{event.title}</Text>
                                            <Text style={[{ fontSize: 12 }, styles.text]}>{event.date.slice(0, 10)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.showDetails(events)}
                                </View>
                            )
                        }}
                    />
                </View>
            </ImageBackground>
        );
    }

}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    flatList: {
        width: 300,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 2,
    },
    touchableContainer: {
        backgroundColor: 'rgb( 102,45,145)',
        minWidth: 280,
        maxWidth: 280,
        minHeight: 50,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        zIndex: 2,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    touchableItemsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    contentContainer: {
        marginVertical: 10
    },
    text: {
        color: 'white'
    },
    descriptionContainerText: {
        color: 'white'
    },
    linkText: {
        color: 'lightblue'
    }
});
