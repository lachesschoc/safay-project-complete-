import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	zoom,
	DeviceEventEmitter,
	NativeEventEmitter
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {MotionSensors} from 'NativeModules';
var {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

import timer from 'react-native-timer';
import PinMarker from './PinMarker';
/**
// fetch logger on command
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};
*/
var d = new Date();
var milliseconds = d.getTime();

var dataAcc = {
	count:0,
	time:0,
	data:[]
};

var sensors = {};
var sensorData = "";


//test data
var returnData = {
	type: 'FeatureCollection',
  features:
   [ { type: 'point',
       location: [ 13.8159384675, 100.583336262 ],
       prop: 'good' },
     { type: 'point',
       location: [ 13.8159384675, 100.583336262 ],
       prop: 'good' }
	 ]
	 }

var color = {
	good:{
		backgroundColor:'#006600',
		colorText:'#FFFFFF',
		borderColor:"#006633"
	},
	bad:{
		backgroundColor:'#FF5A5F',
		colorText:'#FFFFFF',
		borderColor:"#D23F44"
	},
	bump:{
		backgroundColor:'#0404B4',
		colorText:'#FFFFFF',
		borderColor:"#0B0B61"
	}

}

//stop send data n times
var delay = 0; // ถ้าต้องการให้มีการข้ามการส่งค่า หลังจากนับค่าครบ แล้วรอส่งรอบใหม่
var subscription = null;
var lastTime = 0; // *ห้ามเปลี่ยนค่า เอาไว้ตรวจสอบค่าเพื่อจะส่งค่า GPS ไปหรือไม่
var removeIndex = 0; // *ห้ามเปลี่ยนค่า  // => start data index
var countData = 1000; // *ปรับได้ตามความเหมาะสม // จำนวนข้อมูลที่ต้องการส่ง
var removeData = 1000; // *ปรับได้ตามความเหมาะสม // จำนวนข้อมูลเก่าที่ต้องการลบก่อนเพิ่มเข้าไปใหม่


const LATITUDE_DELTA = 0.00222; //ปรับ zoom map ยิ่ง ค่าน้อย ยิ่ง zoom มาก
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;  // คูณสัดส่วน size ตามจอ

export default class Route2 extends Component { //FIRST
	constructor(props){
	super(props);

	//ค่าเริ่มต้น อันนี้ใช้กับview ตอนrender คือรูปหน้า route ที่เป็นเป็น ค่าด้านล่าง
	this.state = {
		data:'',
		datetime:'',
		dataReturn:'',
		countAcc:0,
		stopGy:false,
		stopAcc:false,
		stopMag:false,
		countDelay:0,
		count:0,
		time: 0,
		Accx: 0,
		Accy: 0,
		Accz: 0,
		Gyx: 0,
		Gyy: 0,
		Gyz: 0,
		Magx: 0,
		Magy: 0,
		Magz: 0,
		region: {
			latitude: 13.980881,
			longitude: 100.5545009,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
		markers:[],

	};

	this.onRegionChange = this.onRegionChange.bind(this);
}

	// เซ็ตค่าให้กับ  marker
	setMapMarker(returnData)
	{
		var mkColor = color.good;
		var markers = [];
		for (var i = 0, len = returnData.features.length; i < len; i++) {
		 var feature = returnData.features[i];
		 if(i==returnData.features.length-1){
			 this.setState({
				 markers:markers
			 });
			 var markers = [];
		 }
		 if(feature.prop == 'bad')
		 {
			 mkColor = color.bad;
		 }else if(feature.prop == 'bump'){
			 mkColor = color.bump;
		 }
		 //เพิ่มค่าเข้าไปยังอาเรย์  makers
			markers.push({key:i,'coordinate':{'latitude':feature.location[0],'longitude':feature.location[1]},title:feature.prop,color:mkColor})
	 }
	}

	getDataApi()
	{

		this.setState({
			stopGy:true,
			stopMag:true,
			stopAcc:true,
		});
		var date = new Date();
    var strDate = "D" +("0" + date.getDate()).slice(-2)+ "-" + ("0" + (date.getMonth() + 1)).slice(-2)+ "-" + date.getFullYear() ;
		strDate = strDate + "T" +  ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
   console.log('DateTime : '+strDate);
	  var url = 'http://gisddns.hopto.org:5555';
		// ส่งค่าไปหา api
		fetch(url,{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				//'Content-Type': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				user_key: 'aKvasB',
				datetime: strDate,//'D07-05-2017T17-00-00',
				sensors_data: this.state.data,
			})
		})
		.then((response) => response.json())
		.then((responseData) => {


			//Set Markers
			// พล็อต markers  ลงแผนที่
			this.setMapMarker(responseData);
		})
		.catch((error) => {
			if(error.TypeError !== undefined)
			{
				console.warn('error',error[TypeError])
			}else{
				console.warn(error);
			}

		});


	}


	 setData(data){

		//set ค่า ให้แต่ละบบรทัด
		dataAcc.count = parseInt(dataAcc.count, 10)+1;
		if(dataAcc.count == 0){
			dataAcc.time = data.rotationRate.timestamp;
			lastTime = dataAcc.time;
		}else{
			if(dataAcc.time != 0){
				dataAcc.time = dataAcc.time + 0.01; // ให้เวลาเพิ่มขึ้นทุก 10 ms
			}else{
				dataAcc.time = data.rotationRate.timestamp;
			}

			if(lastTime == 0){
				lastTime = dataAcc.time;
			}

		}
      // เพิ่มค่าเซ็นเซอร์ลง object sensors อันนี้คือค่าที่ส่งไปที่เซิฟ
			sensors = {
				latitude:this.state.region.latitude,
				longitude:this.state.region.longitude,
				Gyx: data.rotationRate.x,
				Gyy: data.rotationRate.y,
				Gyz: data.rotationRate.z,
				Accx: (data.acceleration.x * 9.81).toFixed(4),
				Accy: (data.acceleration.y * 9.81).toFixed(4),
				Accz: (data.acceleration.z * 9.81).toFixed(4),
				Magx: data.magneticField.x.toFixed(4),
				Magy: data.magneticField.y.toFixed(4),
				Magz: data.magneticField.z.toFixed(4),
				/**
				Magx: (Math.random() * (63.999 - 62.001) + 62.001).toFixed(3), อันนี้ไม่เกีี่ยว
				Magy: (Math.random() * (12.999 - 11.001) + 11.001).toFixed(3), อันนี้ไม่เกี่ยว
				Magz: (Math.random() * (1.999 - 0.001) + 0.001).toFixed(3), อันนี้ไม่เกี่ยว
				*/
				time: dataAcc.time,//new Date().getTime()/1000, comment อันนี้คือ timestamp
			};

		//เพิ่มค่าเซนเซอร์ลงในอารเรย์
		dataAcc.data.push(sensors);

		// เอาไว้แสดงค่าใน view
		this.setState({
			count:dataAcc.count,
		});

		 // ถ้านับค่าได้ 1000 ค่า ให้เริ่ม รวมค่าเพื่อส่งข้อมูล
		if(dataAcc.count== countData)
		{
				console.log('Start data at ',removeIndex);
				console.log('count data ',dataAcc.data.length);
				for (var i = removeIndex, len = dataAcc.data.length; i < len; i++) {

					// ถ้าค่าแรก ให้ใส่่ค่า GPS ไปด้วย
					if(i == removeIndex)
					{
						sensorDataRow= dataAcc.data[i].time+', 1, '+dataAcc.data[i].latitude+', '+dataAcc.data[i].longitude+', 0'+
						', 3, '+dataAcc.data[i].Accx+', '+dataAcc.data[i].Accy+', '+dataAcc.data[i].Accz+
						', 4, '+dataAcc.data[i].Gyx+', '+dataAcc.data[i].Gyy+', '+dataAcc.data[i].Gyz+
						', 5, '+dataAcc.data[i].Magx+', '+dataAcc.data[i].Magy+', '+dataAcc.data[i].Magz;

						sensorData = sensorDataRow;


					// ถ้าค่าสุดท้าย (1000)
				}else if(i == removeIndex + countData - 1 ){
						console.log('send data at  ', removeIndex + countData - 1);
						// ถ้าค่า GPS ไม่เปลี่ยน ไม่ต้องใส่ค่าเข้าไป
						//if(dataAcc.data[i-1].latitude == dataAcc.data[i].latitude && dataAcc.data[i-1].longitude == dataAcc.data[i].longitude){
						if(dataAcc.data[i].time - lastTime < 1){

							sensorDataRow= dataAcc.data[i].time+
							', 3, '+dataAcc.data[i].Accx+', '+dataAcc.data[i].Accy+', '+dataAcc.data[i].Accz+
							', 4, '+dataAcc.data[i].Gyx+', '+dataAcc.data[i].Gyy+', '+dataAcc.data[i].Gyz+
							', 5, '+dataAcc.data[i].Magx+', '+dataAcc.data[i].Magy+', '+dataAcc.data[i].Magz;
						}else{
							// ถ้าค่า GPS เปลี่ยน ใส่ค่าเข้าไป
							lastTime = dataAcc.data[i].time;
							sensorDataRow= dataAcc.data[i].time+', 1, '+dataAcc.data[i].latitude+', '+dataAcc.data[i].longitude+', 0'+
							', 3, '+dataAcc.data[i].Accx+', '+dataAcc.data[i].Accy+', '+dataAcc.data[i].Accz+
							', 4, '+dataAcc.data[i].Gyx+', '+dataAcc.data[i].Gyy+', '+dataAcc.data[i].Gyz+
							', 5, '+dataAcc.data[i].Magx+', '+dataAcc.data[i].Magy+', '+dataAcc.data[i].Magz;
						}
						//lastTime = 0;
						sensorData = sensorData+'\n'+sensorDataRow;
						//alert(JSON.stringify(this.getData(sensorData)));

						//set delay time
						if(this.state.countDelay < 1){
							this.setState({
								countDelay:delay,
							});

							// เรียก API
							this.setState({
								dataId:this.state.dataId +1,
								data:sensorData,
							});
							this.props.callbackFromRoute(); //เรียกcallback ไปหน้า route

						}else{
							this.setState({
								countDelay: this.state.countDelay-1,
							});
						}

					//ไม่ใช่ทั้งค่าแรก และ ค่า 1000 สุดท้าย
					}else{
						// ถ้าค่า GPS ไม่เปลี่ยน ไม่ต้องใส่ค่าเข้าไป
						if(dataAcc.data[i].time - lastTime < 1){

							sensorDataRow= dataAcc.data[i].time+
							', 3, '+dataAcc.data[i].Accx+', '+dataAcc.data[i].Accy+', '+dataAcc.data[i].Accz+
							', 4, '+dataAcc.data[i].Gyx+', '+dataAcc.data[i].Gyy+', '+dataAcc.data[i].Gyz+
							', 5, '+dataAcc.data[i].Magx+', '+dataAcc.data[i].Magy+', '+dataAcc.data[i].Magz;
						}else{
							// ถ้าค่า GPS เปลี่ยน ใส่ค่าเข้าไป
							lastTime = dataAcc.data[i].time;
							sensorDataRow= dataAcc.data[i].time+', 1, '+dataAcc.data[i].latitude+', '+dataAcc.data[i].longitude+', 0'+
							', 3, '+dataAcc.data[i].Accx+', '+dataAcc.data[i].Accy+', '+dataAcc.data[i].Accz+
							', 4, '+dataAcc.data[i].Gyx+', '+dataAcc.data[i].Gyy+', '+dataAcc.data[i].Gyz+
							', 5, '+dataAcc.data[i].Magx+', '+dataAcc.data[i].Magy+', '+dataAcc.data[i].Magz;
						}


						sensorData = sensorData+'\n'+sensorDataRow;
					}
				}


				if (removeIndex > -1) {
						removeIndex = removeIndex+removeData;
				}

				dataAcc.count = dataAcc.count - removeData;

				// reset ดาต้าใหม่
				if(dataAcc.count > resetDataCount)
				{
					dataAcc.count = 0;
					dataAcc.data = [];
					removeIndex = 0;
					lastTime = 0;
				}


		}
	}

	componentWillReceiveProps(nextProps){ //รับpropค่าใหม่ 3

    if(this.props.data != nextProps.data){ //จากโค้ด callbackFromRoute() จะไป update prop.data ให้เป็นค่าใหม่
			console.log('getDataApi');
			this.getDataApi(); //พอเป็นค่าใหม่ก็จะส่ง sensors_data ไปที่ api ตาม function getDataApi ด้านบน
    }
  }

componentWillUnmount(){ //6
	MotionSensors.stopGyroUpdates();
	MotionSensors.stopAccelerometerUpdates();
	MotionSensors.stopMagnetometerUpdates();
	navigator.geolocation.clearWatch(this.watchID);
	timer.clearInterval(this,'MotionSensors');
}

componentDidMount() { //2

		// รับค่า GPS จากค่าเริ่มต้น
		navigator.geolocation.getCurrentPosition(
			(position) => {
				var initialPosition = position;
				this.setState({ region: {latitude: initialPosition.coords.latitude, longitude:initialPosition.coords.longitude ,latitudeDelta:LATITUDE_DELTA,longitudeDelta: LONGITUDE_DELTA} });
			},
			(error) => alert(JSON.stringify(error)),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);


		// รับค่า GPS จากค่าใหม่
    this.watchID = navigator.geolocation.watchPosition((position) => {
			var lastPosition = position;
			this.setState({ region: {latitude: lastPosition.coords.latitude, longitude:lastPosition.coords.longitude ,latitudeDelta:LATITUDE_DELTA,longitudeDelta: LONGITUDE_DELTA} });
    });

		MotionSensors.setGyroUpdateInterval(0.01); // set ให้ sensorวิ่ง 10 ms
		MotionSensors.setAccelerometerUpdateInterval(0.01);
		MotionSensors.setMagnetometerUpdateInterval(0.01);
		MotionSensors.startGyroUpdates();
		MotionSensors.startAccelerometerUpdates();
		MotionSensors.startMagnetometerUpdates();

		timer.setInterval(this, 'MotionSensors', ()=>{
			MotionSensors.getMotionData( (error,data)=>{
				//อันไว้เก็บและshow ใน มือถือ
					if(this.state.time != 0 || this.state.time != ''){this.setData(data);}
					this.setState({
						Gyx: data.rotationRate.x,
						Gyy: data.rotationRate.y,
						Gyz: data.rotationRate.z,
						time: data.rotationRate.timestamp,

						Accx: (data.acceleration.x * 9.81).toFixed(4),
						Accy: (data.acceleration.y * 9.81).toFixed(4),
						Accz: (data.acceleration.z * 9.81).toFixed(4),

						Magx: data.magneticField.x.toFixed(4),
						Magy: data.magneticField.y.toFixed(4),
						Magz: data.magneticField.z.toFixed(4),
					});
			});
		}, 10);
}


onRegionChange(region) {
	this.setState({ region });

}

//ไม่ได้ใช้งาน
randomColor() { //ไม่ได้ใช้
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`; //ไม่ได้ใช้
} //ไม่ได้ใช้

	render() {
		return (
			<View style={styles.container}>
        <MapView style={styles.map}
          mapType="standard"
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={false}
          showsPointOfInterest={false}
					region={this.state.region}
        //  onRegionChange={this.onRegionChange}

        >
				{this.state.markers.map(marker => ( // พล็อต markers ทั้งหมดลงแผนที่
				 <Marker
					 key={marker.key} //marker ตามจำนวน
					 coordinate={marker.coordinate} //marker ตาม แผนทีตำแหน่ง
					 pinColor={marker.color.backgroundColor}> //marker ตาม สีที่ตั้ง
				 {<PinMarker
				 		text={marker.title} //ตามtitle good, bad, bump
						backgroundColor={marker.color.backgroundColor}
						color={marker.color.colorText}
						borderColor={marker.color.borderColor}/>}
				 </Marker>
				))}
        </MapView>
				//ให้ค่ารันโชว์บนมือถือ
				<View style={styles.container}>
          <Text>
					Data: {this.state.time}, 1, {this.state.region.latitude}, {this.state.region.longitude},
					3, {this.state.Accx}, {this.state.Accy}, {this.state.Accz},
					4, {this.state.Gyx}, {this.state.Gyy}, {this.state.Gyz},
					5, {this.state.Magx}, {this.state.Magy}, {this.state.Magz},count:{this.state.count}, countDelay:{this.state.countDelay}{'\n'}
          </Text>

        </View>

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
		top: 0,
    width: width,
    height: height*2/3
  }
});
