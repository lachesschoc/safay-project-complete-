import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Communications from 'react-native-communications';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import piccall from '../image/emergencyphone.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  Button: {
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
  },
  Button2:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -10,
  },
  Button3:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -20,
  },
  Button4:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -30,
  },
  Button5:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -40,
  },
  Button6:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -50,
  },
  Button7:{
    backgroundColor: '#89C4FF',
    paddingVertical: 25,
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    top: -60,
  },
	text: {
		color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
	},
  image: {
    top: -638,
    left: 310,
    width: 60,
    height: 60,
  },
  image2: {
    top: -615,
    left: 310,
    width: 60,
    height: 60,
  },
  image3: {
    top: -592,
    left: 310,
    width: 60,
    height: 60,
  },
  image4: {
    top: -569,
    left: 310,
    width: 60,
    height: 60,
  },
  image5: {
    top: -546,
    left: 310,
    width: 60,
    height: 60,
  },
  image6: {
    top: -523,
    left: 310,
    width: 60,
    height: 60,
  },
  image7: {
    top: -500,
    left: 310,
    width: 60,
    height: 60,
  }
});

const Info = ()  => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Communications.phonecall('911', true)}>
          <View style={styles.Button} >
            <Text style={styles.text} >แจ้งเหตุด่วนเหตุร้าย (911)</Text>
          </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('1192', true)}>
          <View style={styles.Button2}>
            <Text style={styles.text}>แจ้งรถหาย, ถูกขโมย (1192)</Text>
          </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('199', true)}>
          <View style={styles.Button3}>
            <Text style={styles.text}>แจ้งเหตุไฟไหม้-ดับเพลิง (199)</Text>
          </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('1669', true)}>
          <View style={styles.Button4}>
            <Text style={styles.text}>หน่วยแพทย์ฉุกเฉิน(ทั่วไทย) (1669)</Text>
          </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('1155', true)}>
          <View style={styles.Button5}>
            <Text style={styles.text}>สายด่วนตำรวจท่องเที่ยว (1155)</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('1554', true)}>
        <View style={styles.Button6}>
          <Text style={styles.text}>หน่วยกู้ชีพวชิรพยาบาล (1554)</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.phonecall('1586', true)}>
        <View style={styles.Button7}>
          <Text style={styles.text}>สายด่วนกรมทางหลวง (1586)</Text>
        </View>
      </TouchableOpacity>

        <Image source={piccall} style={styles.image} />
        <Image source={piccall} style={styles.image2} />
        <Image source={piccall} style={styles.image3} />
        <Image source={piccall} style={styles.image4} />
        <Image source={piccall} style={styles.image5} />
        <Image source={piccall} style={styles.image6} />
        <Image source={piccall} style={styles.image7} />
    </View>
  );
}


export default Info
