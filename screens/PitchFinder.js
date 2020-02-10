import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { styles } from '../stylesheets/PitchFinderStyles'
import { Accelerometer } from "expo-sensors";
import helperFunctions from '../sharedFunctions';

Accelerometer.setUpdateInterval(200)

class PitchFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      accelerometerData: { x: 0, y: 0, z: 0 },
      pitch: '',
      selected: false
    };
  }

  componentWillUnmount = async () => {
    if (this.subscribeToAccelerometer) {
      this.unsubscribeFromAccelerometer();
    }
  }

  componentDidMount = async () => {
    this.getPermissionAsync();
    this.subscribeToAccelerometer();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  subscribeToAccelerometer = async () => {
    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => this.setState({ accelerometerData })
    );
  };

  unsubscribeFromAccelerometer = () => {
    this.accelerometerSubscription && this.acceleroMeterSubscription.remove();
    this.accelerometerSubscription = null;
  };

  goToOrientation = () => this.props.navigation.navigate('Orientation')

  deletePitch = () => {
    this.setState({
      pitch: 0,
      selected: false
    })
  }

  saveState = (value) => {
    this.setState({
      pitch: value,
      selected: true
    }, () => {
      helperFunctions.saveData('pitch', value);
    });    
  }

  render() {
    const xValue = this.state.accelerometerData.x
    const yValue = this.state.accelerometerData.y
    const pitch = Math.abs((Math.atan2((-xValue), Math.sqrt(yValue * yValue)) * 57.3) - 90)
    

    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
            <View style={styles.outputTextBox}>
              {!this.state.selected && (
                <Text style={styles.outputText}>{pitch.toFixed(0)}</Text>
              )}
              {this.state.selected && (
                <Text style={styles.outputText}>{this.state.pitch.toFixed(0)}</Text>
              )}
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={this.goToOrientation} >
                <Ionicons
                  name="ios-close"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              {!this.state.selected && (
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.saveState(pitch)} >
                  <FontAwesome
                    name="save"
                    style={styles.cameraIcon}
                  />
                </TouchableOpacity>)}
              {this.state.selected && (
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.deletePitch()}>
                  <AntDesign
                    name="delete"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default withFirebaseHOC(PitchFinder)