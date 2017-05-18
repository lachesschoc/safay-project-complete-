'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase from './Firebase';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid:'',
      name: '',
      email:'',
      photoUrl:'',
      emailVerified:'',
  }
  this.setState = this.setState.bind(this)
}
  componentDidMount(){

  }

  componentWillMount()
  {
      this.getProfile()
  }

 getDisplayName(uid){
    try {
       var self = this;
       var profileRef = firebase.database().ref(`profiles/${uid}/details`);
       var displayName ="";

       profileRef.on('value', (profile)=> {
          const val = profile.val();
          displayName = val.displayName;
          self.setState({
            name : val.displayName,
          })
        });
    }catch (error) {
        console.log(error.toString())
    }
  }

  getProfile(){
    var self = this;
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;


    if (user != null) {

      this.getDisplayName(user.uid);
      self.setState({
        uid : user.uid,
        email : user.email,
        photoUrl : user.photoUrl,
        emailVerified : user.emailVerified,

      })
    }else{
    //  Alert(user.toString());
    }
  }

  async logout() {

      try {

          await firebase.auth().signOut();
          Actions.login();
          // Navigate to login view

      } catch (error) {
          console.log(error);
          Actions(error.toString());
      }

  }


	render() {
		return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text style={styles.textcolor}> Name: {'\n'} </Text>
          {this.state.name+'\n'} {'\n'}
          <Text style={styles.textcolor}> E-mail: {'\n'} </Text>
          {this.state.email+'\n'}
        </Text>
        <TouchableOpacity onPress={()=>this.logout()}>
          <View style={styles.Buttonlogout} >
            <Text style={styles.logout}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>


		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  Buttonlogout:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,

  },
  logout:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textcolor:{
    color: '#4E9258',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
  },
});
