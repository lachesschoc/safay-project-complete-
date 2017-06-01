import React, { Component, PropTypes } from 'react';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	TouchableOpacity,
	Text,
	Alert
} from 'react-native';

import firebase from './Firebase';
import Button from "react-native-button"; //moudule in react-native library
// import UserInput from './UserInput'; 
import Wallpaper from './Wallpaper';
import usernameImg from '../image/username.png';
import passwordImg from '../image/password.png';

import Logo from './Logo';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Loginform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password:'',
			homePage : false,
			loginPage : true,};
	}

  componentDidMount(){
    this.isLogin()
  }

  isLogin(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { //ไม่เกี่ยว
      //  Actions.home();
      }
    });
  }

	async login(email, pass) { // login ด้วย firebase

	    try {
	        await firebase.auth().signInWithEmailAndPassword(email, pass); //ถ้าตรงกับข้อมูลใน firebase ไปหน้า map

	        console.log("Logged In!");

					Actions.home();
	        // Navigate to the Home page

	    } catch (error) { //ถ้าผิด
	        console.log(error.toString())

					Alert.alert(error.toString()) //ขึ้นเตือน message error
	    }

	}


	render() {
		return (
			<Wallpaper> //ใส่ Wallpaper ไปดึงมาจาก Wallpaper.js
			<View style={styles.container}>
				<Logo />
					<View style={styles.container2}>
					<KeyboardAvoidingView behavior='padding' >
						<UserInput source={usernameImg}
							placeholder='Username' //ช่องใส่ username
							autoCapitalize={'none'}
							returnKeyType={'done'}
							autoCorrect={false}
							name="email"
							value={this.state.email}
							onChangeText={(text) => this.setState({email: text})}/>
						<UserInput source={passwordImg}
							secureTextEntry={true}
							placeholder='Password' //ช่องใส่pass
							returnKeyType={'done'}
							autoCapitalize={'none'}
							autoCorrect={false}
							name="password"
							value={this.state.password}
							onChangeText={(text) => this.setState({password: text})} />
					</KeyboardAvoidingView>
					</View>
				<TouchableOpacity style={{

							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#ff8011',
							height: MARGIN,
							borderRadius: 20,
							zIndex: 100,
							width: DEVICE_WIDTH - 40,
							borderRadius: 5,
							paddingLeft: 5,
							paddingRight: 5,
							paddingTop: 10,
							paddingBottom: 10,
							top: -120,
							justifyContent: 'center',
						}}
						onPress={()=>this.login(this.state.email,this.state.password)}> //กดปุ่ม login ส่งค่าที่ ใส่ email และ password ไปเช็ค ที่firebase ในฟังก์ชัน login(line 47)
                <Text style={{color: '#fff',fontWeight: '700',fontSize: 15 , textAlign: 'center'}}>Login</Text>
        </TouchableOpacity>
				<Text style={styles.Doyou}> Do not have an account yet?</Text>
				<TouchableOpacity onPress={()=>Actions.signup()}> //ปุ่ม signup
					<Text style={styles.Sign} >SIGN UP</Text>
				</TouchableOpacity>
			</View>
			</Wallpaper>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 5,
		top: 0,
		alignItems: 'center',
		//backgroundColor : '#00AA66'
	},
	container2: {
		flex: 1,
		top: -50,
		alignItems: 'center',
	},
	Sign: {
		top: -50,
		color: 'white',
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: '700',
		backgroundColor: 'transparent',
	},
  Doyou:{
    top: -55,
    color: '#DCDCDC',
    fontSize: 15,
    backgroundColor: 'transparent',
  }
});
