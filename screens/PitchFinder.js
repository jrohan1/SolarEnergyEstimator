import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/PitchFinderStyles'
import { Accelerometer } from "expo-sensors";

Accelerometer.setUpdateInterval(200)

class PitchFinder extends Component {

  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    accelerometerData: { x: 0, y: 0, z: 0 },
    pitch: 0
  }

  async componentWillUnmount() {
    if(this.subscribeToAccelerometer) {
      this.unsubscribeFromAccelerometer();
    }
  }

  async componentDidMount() {
    this.getPermissionAsync();
    this.subscribeToAccelerometer();
  }

  getPermissionAsync = async () => {
     // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
  }

  // pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   });
  // }

  subscribeToAccelerometer = () => {
    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => this.setState({ accelerometerData })
    );
  };

  unsubscribeFromAccelerometer = () => {
    this.accelerometerSubscription && this.acceleroMeterSubscription.remove();
    this.accelerometerSubscription = null;
  };
  
  goToAreaCalculator = () => this.props.navigation.navigate('AreaCalculator')

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  }

  render() {
    const xValue = this.state.accelerometerData.x
    const yValue = this.state.accelerometerData.y
    const pitch = Math.abs((Math.atan2((-xValue), Math.sqrt(yValue*yValue))*57.3)-90)

    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref}}>
            <View style={styles.outputTextBox}>
              <Text style={styles.outputText}>{pitch.toFixed(0)}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={this.goToAreaCalculator} >
                <Ionicons
                  name="ios-close"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => this.takePicture()} >
                <FontAwesome
                  name="camera"
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default withFirebaseHOC(PitchFinder)