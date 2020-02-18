import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { styles } from '../stylesheets/PitchFinderStyles'
import { Accelerometer } from "expo-sensors";

Accelerometer.setUpdateInterval(200)

class PitchFinder extends Component {
  _isMounted = false;
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
    this._isMounted = false;
    if (this.subscribeToAccelerometer) {
      await this.unsubscribeFromAccelerometer();
    }
  }

  componentDidMount = async () => {
    this._isMounted = true;
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

  unsubscribeFromAccelerometer = async () => {
    this.accelerometerSubscription && this.acceleroMeterSubscription.remove();
    this.accelerometerSubscription = null;
  };

  goToPitchMenu = () => this.props.navigation.navigate('PitchMenu');

  setPitch = (newPitch) => {
    this.setState({
      pitch: newPitch,
      selected: true
    })
  }

  deletePitch = () => {
    this.setState({
      pitch: 0,
      selected: false
    })
  }

  render() {
    const xValue = this.state.accelerometerData.x
    const yValue = this.state.accelerometerData.y
    let pitch = Math.abs((Math.atan2((-xValue), Math.sqrt(yValue * yValue)) * 57.3) - 90);
    pitch = pitch.toFixed(0);
    const { hasPermission } = this.state;

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
            <View style={styles.outputTextBox}>
              {this.state.selected ?
                <Text style={styles.outputText}>{this.state.pitch}</Text>
                :
                <Text style={styles.outputText}>{pitch}</Text>
              }
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={this.goToPitchMenu} >
                <Ionicons
                  name="ios-close"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              {this.state.selected ?
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.deletePitch()}>
                  <AntDesign
                    name="delete"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={() => this.setPitch(pitch)} >
                  <FontAwesome
                    name="save"
                    style={styles.cameraIcon}
                  />
                </TouchableOpacity>
              }
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default withFirebaseHOC(PitchFinder)