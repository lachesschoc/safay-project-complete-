import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
	render() {
		return (
			<View style={styles.container}>
					<TouchableOpacity style={styles.button}>
					  <Text style={styles.text}>LOGIN</Text>
					</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: -20,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ff8011',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
  	width: DEVICE_WIDTH - 40,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#ff8011',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#ff8011',
	},
	text: {
		color: 'white',
    fontWeight: '700',
		fontSize: 21,
		backgroundColor: 'transparent',
	},
});
