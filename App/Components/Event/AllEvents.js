import React, { Component } from 'react';
import {
    TouchableOpacity,
    View, ScrollView,
    Text, FlatList, Dimensions, Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import { _ } from 'lodash';
import moment from 'moment';
var momentTZ = require('moment-timezone');


export default class AllEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            pressedIndex: 0,
            showDetails: false,
            emptyFlatList: ""
        };
    }

    async componentDidMount() {
        let eventsList = JSON.parse(await AsyncStorage.getItem("Events"))
        let resultTab = []
        _.forEach(eventsList.result, function (value, key) {
            //setting today hour on 00 because setted hour 01 when adding a event.
            let europeDate = moment(value.date).tz("Europe/Warsaw", true).format();
            let actualDate = new Date().setHours("00")
            let dateCompare = moment(europeDate).isSameOrAfter(actualDate)
            if (dateCompare) {
                resultTab.push(value)
            }
        });
        if (resultTab.length > 0) {
            resultTab.sort(function (a, b) {
                var c = new Date(a.date);
                var d = new Date(b.date);
                return c - d;
            });
            this.setState({ events: resultTab })
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
                        width: Dimensions.get("window").width,
                        alignSelf: 'center',
                        zIndex: 1,
                        padding: 10
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View >
                                <Text style={[{ fontSize: 16 }, styles.text]}>
                                    City: {events.item.city}
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
                    </View>
                )
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContentContainer}>
                <FlatList
                    style={{ flexDirection: 'column', flex: 1 }}
                    keyExtractor={(key, index) => key._id}
                    contentContainerStyle={{ justifyContent: 'center', alignSelf: 'center' }}
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

const styles = EStyleSheet.create({
    mainContainer: {
        height: Dimensions.get("window").height
    },
    mainContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width: Dimensions.get("window").width, //for full screen
        marginBottom:1,
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
