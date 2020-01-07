import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/PitchFinderStyles'

class PitchFinder extends Component {

  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  goToAreaCalculator = () => this.props.navigation.navigate('AreaCalculator')

  handleCameraType = () => {
    const { cameraType } = this.state

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  }

  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType}>
            <View style={styles.outputTextBox}>
              <Text style={styles.outputText}>35</Text>
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