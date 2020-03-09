import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { homeStyles } from '../stylesheets/HomeStyles';
import { styles } from '../stylesheets/MainStyles';
import AppLogo from '../components/AppLogo';
import DrawerTrigger from '../components/DrawerTrigger';
import { Entypo } from '@expo/vector-icons';


class Home extends Component {

  goToInputMeasurements = () => this.props.navigation.navigate('InputMeasurements');
  goToGetStarted = () => this.props.navigation.navigate('GetStarted');
  goToInfoPage = () => this.props.navigation.navigate('InfoPage');

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row-reverse' }}>
          <DrawerTrigger />
        </View>
        <AppLogo />
        <View>
          <Text style={[styles.textStyle, homeStyles.headerStyle]}>Calculate your homes solar enegry potential</Text>
        </View>
        <View style={homeStyles.infoGroup}>
          <Entypo name="info-with-circle" style={homeStyles.infoIconStyle} />
          <TouchableOpacity onPress={this.goToInfoPage}>
            <Text style={homeStyles.infoButtonStyle}>Information on Solar PV</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.subTextStyle}>Do you know the size of the area where you wish to install solar panels?</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={this.goToInputMeasurements}>
            <Text style={[styles.button, homeStyles.button]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToGetStarted}>
            <Text style={[styles.button, homeStyles.button]}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default withFirebaseHOC(Home)
