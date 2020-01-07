import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

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
            <View style={{
              position: 'absolute',
              marginTop: 50,
              marginLeft: 20,
              height: 80,
              width: 100,
              borderColor: 'red',
              borderWidth: 2,
              backgroundColor: 'white',
              transform: [{ rotate: '90deg' }]
            }}>
              <Text style={{
                fontSize: 50,
                fontWeight: '500',
                textAlign: 'center',
              }}>35</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between", margin: 30 }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: 'transparent',
                }}
                onPress={this.goToAreaCalculator}
              >
                <Ionicons
                  name="ios-close"
                  style={{ color: "#fff", fontSize: 80 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'center',
                  width: 600,
                  borderBottomColor: 'white',
                  borderBottomWidth: 4,
                  borderTopWidth: 4,
                  borderTopColor: 'white',
                  transform: [{ rotate: '90deg' }]
                }}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: 'transparent',
                  transform: [{ rotate: '90deg' }]
                }}
                onPress={() => this.takePicture()}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 60 }}
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