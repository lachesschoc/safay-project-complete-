'use strict';

//var React = require('react-native');
import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from "react-native-button";

class Home extends React.Component {

    logout(){
      Actions.login();
    }
    render(){

        return (
          <View style={styles.container}>
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
            <View style={styles.container}>
                <Text>Loginform</Text>
                <Button onPress={()=>Actions.login()}>Login</Button>
            </View>
            <View style={styles.container}>
                <Text>PageTwo</Text>
                <Button onPress={()=>this.logout()}>Back</Button>
            </View>
          </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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

module.exports = Home;
