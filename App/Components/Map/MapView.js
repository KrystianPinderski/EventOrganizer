import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import moment from 'moment';
var momentTZ = require('moment-timezone');
import _ from 'lodash';
import ApiKey from '../../../mapboxKey';
Mapbox.setAccessToken(ApiKey);
toDisplay = []
userPosition = []

export default class AppMap extends Component {
	state = {
		toDisplay: [],
		userPosition: []
	}
	async componentWillMount() {
		try {
			toDisplay = JSON.parse(await AsyncStorage.getItem("Events"))
			this.setState({ toDisplay: toDisplay.result })
		} catch (e) {
			console.log(e)
		}
		try {
			let UserLocation = JSON.parse(await AsyncStorage.getItem("UserLocation"))
			let lon = parseFloat(UserLocation.position.coords.longitude)
			let lat = parseFloat(UserLocation.position.coords.latitude)
			userPosition.push([lon, lat])
			this.setState({ userPosition })
		} catch (e) {
			console.log(e)
		}
	}

	renderAnnotations() {
		const items = [];
		const { toDisplay } = this.state
		for (let i = 0; i < toDisplay.length; i++) {
			let europeDate = moment(toDisplay[i].date).tz("Europe/Warsaw", true).format();
			let actualDate = new Date().setHours("00")
			let dateCompare = moment(europeDate).isSameOrAfter(actualDate)
			if (dateCompare) {
				toDisplay[i].date = europeDate
				let coordinate = [parseFloat(toDisplay[i].lon), parseFloat(toDisplay[i].lat)];
				const id = `pointAnnotation${i}`;
				items.push(
					<Mapbox.PointAnnotation
						key={id}
						id={id}
						coordinate={coordinate}
						title="This is a point ann"
					>
						<View style={styles.annotationContainer} />
						<Mapbox.Callout title={toDisplay[i].city + " - " + toDisplay[i].title + " " + toDisplay[i].date.slice(0, 10)} />
					</Mapbox.PointAnnotation>
				);
			}
		}
		return items;
	}

	render() {
		const { toDisplay, userPosition } = this.state
		if (toDisplay.length > 0) {
			return (
				<View style={styles.container}>
					<Mapbox.MapView
						styleURL={Mapbox.StyleURL.Light}
						zoomLevel={userPosition[0]?9:5}
						centerCoordinate={userPosition[0] ? userPosition[0] : [ 19.181016,52.320460]}
						style={styles.container}>
						{this.renderAnnotations()}
					</Mapbox.MapView>
				</View>
			);
		} else {
			return <ActivityIndicator size="small" color="#00ff00" />
		}
	}
}
const ANNOTATION_SIZE = 15;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: ANNOTATION_SIZE,
		height: ANNOTATION_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
		borderRadius: ANNOTATION_SIZE / 2,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgba(0, 0, 0, 0.45)',
	},
	annotationFill: {
		width: ANNOTATION_SIZE - 3,
		height: ANNOTATION_SIZE - 3,
		borderRadius: (ANNOTATION_SIZE - 3) / 2,
		backgroundColor: 'orange',
		transform: [{ scale: 0.6 }],
	},
});