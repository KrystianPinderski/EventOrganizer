import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHandler from '../../API/ApiHandler';
import { _ } from 'lodash';
import AppButton from '../AppButton';

userData = [];
eventsList = [];
export default class ManageEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            emptyFlatList: ""
        };
    }
    async componentDidMount() {
        this.setState({ loading: true })
        await this.showList()
    }
    async showList() {
        userData = JSON.parse(await AsyncStorage.getItem("User"))
        eventsList = JSON.parse(await AsyncStorage.getItem("Events"))
        let resultTab = []
        _.forEach(eventsList.result, function (value, key) {
            if (userData.companyName === value.organizer) {
                resultTab.push(value)
            }
        });
        if (resultTab.length > 0) {
            resultTab.sort(function (a, b) {
                var c = new Date(a.date);
                var d = new Date(b.date);
                return c - d;
            });
        } else {
            this.setState({ emptyFlatList: "Nothing found." })
        }
        this.setState({ events: resultTab, loading: false })
    }
    componentWillReceiveProps(nextProps) {

    }

    async getEvents() {
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
    }
    async updateList() {
        await this.getEvents()
        await this.showList()
    }
    async deleteEvent(id) {
        this.setState({ loading: true })
        try {
            await ApiHandler.deleteEvent(id)
                .then(function (response) {
                    if (response.status === 200) {
                    }
                }).catch(function (err) {
                    switch (err.response.status) {
                        case 404:
                            return alert("Event not found.")
                        case 500:
                            return alert("Can't delete this event.")
                        default: alert("sth goes wrong.")
                    }
                })
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => {
            this.updateList()
        }, 2000)
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
    showDetails(events) {
        if (this.state.showDetails === true) {
            if (this.state.pressedIndex === events.index) {
                return (
                    <View style={{
                        backgroundColor: '#460D71',
                        width: Dimensions.get("window").width,
                        alignSelf: 'center',
                        zIndex: 1,
                        padding: 10
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View >
                                <Text style={[{ fontSize: 16, marginBottom: 10 }, styles.text]}>
                                    Place : {"\n" + events.item.city + ", " + events.item.street}
                                </Text>
                                <Text style={[{ fontSize: 16 }, styles.text]}>
                                    Organizer: {events.item.organizer}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                {events.item.link ?
                                    <Text style={styles.linkText} onPress={() => this._goToURL(events.item.link)}>
                                        Go to event page.
                                    </Text>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5 }}>
                            <Text style={[{ fontSize: 16, marginBottom: 5 }, styles.text]}>Description:</Text>
                            <Text style={[{ fontSize: 16 }, styles.text]}>
                                {events.item.description}
                            </Text>
                        </View>

                        <Text style={[{ fontSize: 16, marginTop: 10 }, styles.text]}>Tags:</Text>
                        <FlatList
                            style={{ flexDirection: 'row', flex: 1 }}
                            keyExtractor={(tags, index) => tags}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            data={events.item.tags}
                            renderItem={(tags) => {
                                return (
                                    <Text style={{ minWidth: 30, maxWidth: 90, borderRadius: 5, padding: 5, margin: 2, backgroundColor: 'white', color: "rgb( 102,45,145)" }}>{tags.item}</Text>
                                )
                            }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-end", marginVertical: 10 }}>
                            <AppButton onPress={() => this.updateEvent} textColor="white" text="UpdateEvent"></AppButton>
                            <AppButton onPress={() => this.deleteEvent(events.item._id)} textColor="white" backgroundColor="red" text="DeleteEvent"></AppButton>
                        </View>
                    </View>
                )
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator size="large" color="#00BE2A" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContentContainer}>
                <FlatList
                    style={{ flex: 1 }}
                    keyExtractor={(events, index) => events._id}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={this.state.events}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyFlatList}>
                                <Text style={styles.emptyFlatListText}>{this.state.emptyFlatList}</Text>
                            </View>
                        )
                    }}
                    renderItem={(events) => {
                        let event = events.item
                        return (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity
                                    onPress={() => this.show(events.index)}
                                    style={styles.touchableContainer}
                                >
                                    <View style={styles.touchableItemsContainer}>
                                        <View>
                                            <Text style={[styles.titleText, styles.text]}>
                                                {event.title}
                                            </Text>
                                            <Text style={[{ fontSize: 16, maxWidth: Dimensions.get("window").width * 0.70 }, styles.text]}>{event.city}</Text>
                                        </View>

                                        <Text style={[{ fontSize: 14 }, styles.text]}>{event.date.slice(0, 10)}</Text>
                                    </View>
                                </TouchableOpacity>
                                {this.showDetails(events)}
                            </View>
                        )
                    }}
                />
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        height: Dimensions.get("window").height
    },
    mainContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width: Dimensions.get("window").width, //for full screen
        marginBottom: 1,
    },
    detailsContainer: {

    },
    itemTitleText: {
        fontSize: 20
    },
    touchableItemsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    touchableContainer: {
        backgroundColor: 'rgb( 102,45,145)',
        minHeight: 50,
        width: Dimensions.get("window").width, //for full screen
        padding: 10,
        zIndex: 2,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        color: 'white'
    },
    linkText: {
        color: 'lightblue'
    },
    emptyFlatList: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    titleText: {
        fontSize: 20,
        maxWidth: Dimensions.get("window").width * 0.70
    },
    emptyFlatListText: {
        color: 'black',
        fontSize: 25
    }
});
