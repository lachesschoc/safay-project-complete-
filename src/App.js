import React, { Component } from 'react';
import {
  StyleSheet,
  Alert
} from 'react-native';

import { Router, Scene, Actions , ActionConst, Modal } from 'react-native-router-flux';
import Button from "react-native-button";
//import Logo from './Logo';
//import Wallpaper from './Wallpaper';
//import AppModal from './Modal';

import Loginform from './Loginform';

import Signup from './SignupPage';
//import SignupPage from './SignupPage';
import Map from './Route';
import firebase from './Firebase';

export default class App extends Component {

  constructor(props) {
		super(props);
	}

  componentDidMount(){
    this.isLogin() //เริ่มแรกไปที่ function login
  }

  isLogin(){
    firebase.auth().onAuthStateChanged(function(user) { //เช็ค firebase authen
      if (user) {
        Actions.home(); //ถ้ามีก็ไปหน้า map
      } else {
       Actions.login(); //ไม่มีก็อยู่หน้า login
      }
    });
  }

  render() {
    return (
      <Router> //ตัวที่กดแล้วไปหน้าอื่น
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar hideTabBar> //ซ่อน tabbar
          <Scene key="home" component={Map} title="Home" type={ActionConst.REPLACE}/> //หน้า map
          <Scene key="login" component={Loginform} initial={true} type={ActionConst.REPLACE}/> //หน้าlogin
          <Scene key="signup" component={Signup} title="Signup" /> //หน้า signup
        </Scene>
      </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
