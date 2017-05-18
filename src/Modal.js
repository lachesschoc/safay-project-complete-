import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import Logo from './Logo';
import Loginform from './Loginform';
import ButtonSubmit from './ButtonSubmit';
import Wallpaper from './Wallpaper';
import Signup from './Signup';
import SignupPage from './SignupPage';
import Route from './Route';

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


export default class AppModal extends Component {
  render(){
    const state = this.props.state;
      let status = state.modal;
      let setComponent = <View />;

      if(state.modalComponent === 'login'){
        setComponent = <Loginform manageModal={(mode, status)=> this.props.manageModal(mode, status)} closeModal={()=>this.props.closeModal()} />;
      }else if(state.modalComponent === 'signup'){
        setComponent = <Signup manageModal={(mode, status)=> this.props.manageModal(mode, status)} closeModal={()=>this.props.closeModal()} />;
      }else if(state.modalComponent === 'SignupPage'){
        setComponent = <SignupPage manageModal={(mode, status)=> this.props.manageModal(mode, status)} closeModal={()=>this.props.closeModal()}/>;
      }else if(state.modalComponent === 'Route'){
        setComponent = <Route manageModal={(mode, status)=> this.props.manageModal(mode, status)} closeModal={()=>this.props.closeModal()}/>;
      }else if(state.modalComponent === 'Profile'){
        setComponent = <Profile manageModal={(mode, status)=> this.props.manageModal(mode, status)} closeModal={()=>this.props.closeModal()}/>;
      }
      // console.log('Test State : ' + JSON.stringify(this.props.state));
      return (
        <Modal
          transparent={true}
          visible={status}
          onRequestClose={() => ''}
        >
          <Wallpaper>
            {setComponent}
          </Wallpaper>
        </Modal>
  );
}
}
