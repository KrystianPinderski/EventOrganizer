import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import ApiHandler from '../../API/ApiHandler';
import AsyncStorage from '@react-native-community/async-storage';

let events = []
export default class TagsEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
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
        this.setState({ events,loading:false })
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        if(this.state.loading){
            return(
                <Text>Loading...</Text>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(events, index) => events._id}
                    data={this.state.events}
                    renderItem={(events) => {
                        let event = events.item
                        return (
                            <View>
                                <Text>{event.title}</Text>
                                <FlatList
                                    keyExtractor={(tags, index) => tags}
                                    data={events.item.tags}
                                    renderItem={(tags) => {
                                        return (<Text>{tags.item}</Text>)
                                    }}
                                />
                            </View>

                        )
                    }}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
