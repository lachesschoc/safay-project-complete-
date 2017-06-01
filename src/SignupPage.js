import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,

} from 'react-native';
import Popup from 'react-native-popup';
import {Actions} from 'react-native-router-flux';
import firebase from './Firebase';

const background = require("../image/map.png");
const backIcon = require("../image/back.png");
const personIcon = require("../image/signup_person.png");
const lockIcon = require("../image/signup_lock.png");
const emailIcon = require("../image/signup_email.png");
const ConfirmpassIcon = require("../image/signup_lock.png");
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    top: 80,
    backgroundColor: '#ff8011',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  },
  Confirmtext: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
	backButton: {
		top: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ff8011',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
  	width: DEVICE_WIDTH - 40,
		left: 20,
	},
	backtext: {
		color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
	}
})

export default class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {name:'', email: '',password:'', passwordConfirm:''};
  }

  async login(email, pass) {

	    try {
	        await firebase.auth().signInWithEmailAndPassword(email, pass);

	        console.log("Logged In!");


	    } catch (error) {
	        console.log(error.toString())
					Alert(error.toString());
	    }

	}

  async signup(email, pass) {

      try {
          await firebase.auth().createUserWithEmailAndPassword(email, pass); //สร้าง id pass ที่กรอกไปเก็บใน firebase

          this.login(email, pass);

          firebase.auth().onAuthStateChanged((user)=> {

             if (user) {
               // Determine if user needs to verify email
              // var emailVerified = !user.providerData || !user.providerData.length || user.providerData[0].providerId != 'password' || user.emailVerified;

               // Upsert profile information
              // var profileRef = firebase.database().ref(`profiles/${user.uid}`);
              // profileRef.update({ emailVerified: emailVerified , displayName:this.state.name});

               let profileRef = "/profiles/" + user.uid + "/details";

               return firebase.database().ref(profileRef).set({
                   displayName: this.state.name
               })

               Actions.home(); //ปุ่ม กดไปหน้า map หลังกดจะขึ้น popup SUCCESS
             }else{
               Actions.login();
             }

           });

          console.log("Account created");

          //this.popup.alert('SUCCESS !!');
          Alert.alert('SUCCESS !!')


          // Navigate to the Home page, the user is auto logged in

      } catch (error) {
          console.log(error.toString())

          Alert.alert(error.toString());
      }

  }



  handleSubmit(event) {
    event.preventDefault();
    if(this.validateEmail(this.state.email) != true) //ถ้าemail ไม่ถูกขึ้น invalid email
    {
      alert('invalid email');

      return;
    }

    if(this.validatePassword(this.state.password, this.state.passwordConfirm) != true) // ถ้ากรอก password กับ Confirm password ไม่ตรงกัน ขึ้น not match
    {
      alert('Passwords do not match');

      return;
    }

    this.signup(this.state.email, this.state.password);

  }

  validateEmail(email) //รูปแบบ email ที่กรอก บางคนไม่ใส่ @ ก็ผิดรูปแบบ
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(password, passwordConfirm) //ถ้าตรงกัน ก็ true ไม่ตรงก็ false
  {
    if(password == passwordConfirm)
    {
      return true;
    }
    return false;
  }

  _alertTest() {
      this.popup.alert('SUCCESS !!');
  }

	render() {
  return (
    <View style={styles.container}>
// Userinterface
        <Image
          source={background} //background
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Name"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                name="name"
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={emailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
                keyboardType="email-address"
                autoCapitalize={'none'}
                name="email"
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={lockIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF"
                name="password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={ConfirmpassIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Confirm Password"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChangeText={(text) => this.setState({passwordConfirm: text})}
              />
            </View>

          </View>

          <View style={styles.footerContainer}>

            <TouchableOpacity onPress={(event)=>this.handleSubmit(event)} style={styles.wrapper}> //กดปุ่ม confirm มันจะไปเรียกฟังก์ชันด้านบน handleSubmit
              <View style={styles.signup}>
                <Text style={styles.Confirmtext} >Confirm</Text>
              </View>
            </TouchableOpacity>



						<TouchableOpacity onPress={()=>Actions.login()} style={styles.backButton}> // กลับไปหน้า login
							<Text style={styles.backtext} >Back</Text>
						</TouchableOpacity>

          </View>
          <Popup ref={popup => this.popup = popup }/>
        </Image>

      </View>
    );
}
}
