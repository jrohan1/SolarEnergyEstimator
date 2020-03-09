import React, { Component } from 'react'
import { withFirebaseHOC } from '../config/Firebase'
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { Card, CardItem, Body, Right, Left, Icon } from 'native-base';
import { customStyles } from '../stylesheets/PitchFinderStyles';
import { styles } from '../stylesheets/MainStyles';
import { Accelerometer } from "expo-sensors";
import helperFunctions from '../sharedFunctions';

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
      selected: false,
      area: [],
      pitches: [],
      showCard: true
    };
  }

  componentWillUnmount = async () => {
    this._isMounted = false;
    if (this.subscribeToAccelerometer) {
      await this.unsubscribeFromAccelerometer();
    }
  }
  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ area: JSON.parse(value) }));
  }

  componentDidMount = async () => {
    this._isMounted = true;
    this.askPermissionAsync();
    this.getPermissionAsync();
    this.subscribeToAccelerometer();
  }

  askPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
    if (status !== 'granted') {
      alert('Hey! You can not use this tool without granting access to your camera. Please go to Settings and change access permissions');
      this.goToHome();
    }
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Hey! You can not use this tool without granting access to your camera. Please go to Settings and change access permissions');
    }
  }


  subscribeToAccelerometer = async () => {
    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => this.setState({ accelerometerData })
    );
  };

  unsubscribeFromAccelerometer = async () => {
    this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
  };

  goToOrientation = () => this.props.navigation.navigate('Orientation');
  goToTutorial = () => this.props.navigation.navigate('PitchTutorial');
  goToHome = () => this.props.navigation.navigate('Home');

  setPitch = (newPitch) => {
    this.setState({
      pitch: newPitch,
      selected: true
    }, () => {
      this.addpitchToArray();
    })
  }

  deletePitch = () => {
    this.setState({
      pitch: 0,
      selected: false
    })
  }

  checkForMultipleAreas = () => {
    if (this.state.area.length > 1) {
      this.setState({
        multipleAreas: true
      })
    }
    if (this.state.area.length === this.state.pitches.length) {
      this.goToOrientation();
    }
  }

  addpitchToArray = () => {
    if (this.state.pitch !== '') {
      this.setState(state => {
        const pitches = state.pitches.concat(state.pitch);
        return {
          pitches
        };
      }, () => {
        helperFunctions.saveArrayData('pitch', this.state.pitches);
      });
    }
  }

  repeatPitchValue = () => {
    const area = this.state.area.map(
      (areas, index) => {
        let pitches = this.state.pitches;
        pitches[index] = this.state.pitch;
        this.setState({ pitches })
      }
    )
    helperFunctions.saveArrayData('pitch', this.state.pitches);
    this.goToOrientation();
  }

  toggleMultipleAreasPostCard = () => {
    this.setState({
      multipleAreas: false,
      selected: false
    })
  }

  toggleOpeningPostCard = () => {
    this.setState({
      showCard: false
    });
  }

  render() {
    const xValue = this.state.accelerometerData.x
    const yValue = this.state.accelerometerData.y
    let pitch = Math.abs((Math.atan2((-xValue), Math.sqrt(yValue * yValue)) * 57.3) - 90);
    pitch = pitch.toFixed(0);
    const { hasPermission } = this.state;

    if (pitch > 90) {
      pitch = Math.abs(90 - (Math.atan2((-xValue), Math.sqrt(yValue * yValue)) * 57.3) - 90);
      pitch = pitch.toFixed(0);
    }

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={customStyles.container}>
          {this.state.showCard ?
            <Card style={styles.cardStyle}>
              <ScrollView>
                <View>
                  <CardItem>
                    <Left></Left>
                    <Body></Body>
                    <Right>
                      <TouchableOpacity success onPress={() => this.toggleOpeningPostCard()}>
                        <Text style={styles.closeButtonStyle}>Skip</Text>
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Watch tutorial video:</Text>
                    <TouchableOpacity success onPress={this.goToTutorial}>
                      <Icon active type="Entypo" name="video" style={styles.videoButtonStyle} />
                    </TouchableOpacity>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>To get the most accurate measurement, stand directly opposite the central apex of your roof.</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Hold the phone as steady as possible.</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Tilt phone horizontally to match the pitch.</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Try not to tilt the phone backwards or forwards.</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Click on the save button to save the angle on screen.</Text>
                  </CardItem>
                </View>
              </ScrollView>
            </Card>
            :
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
              <View style={customStyles.outputTextBox}>
                {this.state.selected ?
                  <Text style={customStyles.outputText}>{this.state.pitch}</Text>
                  :
                  <Text style={customStyles.outputText}>{pitch}</Text>
                }
              </View>
              <View style={customStyles.iconContainer}>
                <TouchableOpacity
                  style={customStyles.iconStyle}
                  onPress={() => this.checkForMultipleAreas()} >
                  <Ionicons
                    name="ios-close"
                    size={50}
                    style={customStyles.closeIcon}
                  />
                </TouchableOpacity>
                <View style={customStyles.lineStyle} />
                {this.state.selected ?
                  <TouchableOpacity
                    style={customStyles.iconStyle}
                    onPress={() => this.deletePitch()}>
                    <AntDesign
                      name="delete"
                      size={50}
                      style={customStyles.deleteIcon}
                    />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={customStyles.iconStyle}
                    onPress={() => this.setPitch(pitch)} >
                    <FontAwesome
                      name="save"
                      size={50}
                      style={customStyles.cameraIcon}
                    />
                  </TouchableOpacity>
                }
              </View>
            </Camera>
          }
          {this.state.multipleAreas && (
            <View style={customStyles.container}>
              <Card style={styles.cardStyle}>
                <View>
                  <CardItem header>
                    <Text style={styles.cardTextStyle}>You have marked more than one area to fit solar panels.</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.cardTextStyle}>Do you want to use the same pitch value for all areas?</Text>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <TouchableOpacity success onPress={() => this.repeatPitchValue()}>
                        <Text style={[styles.button, customStyles.button]}>Yes</Text>
                      </TouchableOpacity>
                    </Left>
                    <Right>
                      <TouchableOpacity success onPress={() => this.toggleMutipleAreasPostCard()}>
                        <Text style={[styles.button, customStyles.button]}>No</Text>
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </View>
              </Card>
            </View>
          )}
        </View>
      );
    }
  }
}

export default withFirebaseHOC(PitchFinder)