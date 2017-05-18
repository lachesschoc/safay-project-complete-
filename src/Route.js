import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	MapView,
	zoom,
	DeviceEventEmitter
} from 'react-native';
import {Accelerometer, Gyroscope, Magnetometer} from 'NativeModules';
var {height, width} = Dimensions.get('window');
//import api from './api';
import Profile from './Profile';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Info from './Info';
// import motion from './motion';
import Route2 from './Route2';
import HomeTest from './HomeTest';

export default class Route extends Component {

	constructor(props){
		super(props);

		this.state = {
			data:0
		}
	}

	setNewData(){
		this.setState({
			data:this.state.data+1
		});
	}

	render() {
		return (
			<View style={styles.container}>
			<ScrollableTabView
			style={{marginTop: 20, }}
			renderTabBar={() => <ScrollableTabBar />}
		>
				<Route2 tabLabel="Route" data={this.state.data} callbackFromRoute={()=>this.setNewData()}/>
				<Profile tabLabel="Profile" />
				<Info tabLabel="Information" />
			</ScrollableTabView>
      </View>

		);
	}
}





const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	image: {
		width: 200,
		height: 200,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	},
	map: {
		top: 50,
    width: 10,
    height: height*2/3,
  }
});
