import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Logo from './Logo';
import Loginform from './Loginform';
import ButtonSubmit from './ButtonSubmit';
import Wallpaper from './Wallpaper';
import AppModal from './Modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05121F',
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

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      modalComponent: null,
    };
  }

  componentWillMount () {
  this.checkLoginStatus()
}

// firebase check login status
checkLoginStatus(){
  this.manageModal('login', true);
}

  manageModal(mode, status){
    let newState = this.state;
    newState.modalComponent = mode;
    newState.modal = status;
    this.setState(newState);
  }

  closeModal(){
    let newState = this.state;
    newState.modalComponent = null;
    newState.modal = false;
    this.setState(newState);
  }

  render(){
  return (
    <View style={styles.container}>
        <AppModal
          state={this.state}
          closeModal={()=>this.closeModal()}
          manageModal={(mode, status)=>this.manageModal(mode, status)}
          />
    </View>
  );
}
}
