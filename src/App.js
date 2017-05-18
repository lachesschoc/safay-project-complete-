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
    this.isLogin()
  }

  isLogin(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        Actions.home();
      } else {
       Actions.login();
      }
    });
  }

  render() {
    return (
      <Router>
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar hideTabBar>
          <Scene key="home" component={Map} title="Home" type={ActionConst.REPLACE}/>
          <Scene key="login" component={Loginform} initial={true} type={ActionConst.REPLACE}/>
          <Scene key="signup" component={Signup} title="Signup" />
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
