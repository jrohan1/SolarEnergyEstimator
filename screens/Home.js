import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { homeStyles } from '../stylesheets/HomeStyles';
import { styles } from '../stylesheets/MainStyles';
import AppLogo from '../components/AppLogo';
import DrawerTrigger from '../components/DrawerTrigger';

class Home extends Component {

  goToSignup = () => this.props.navigation.navigate('Signup')
  goToLogin = () => this.props.navigation.navigate('Login')
  goToInputMeasurements = () => this.props.navigation.navigate('InputMeasurements')
  goToGetStarted = () => this.props.navigation.navigate('GetStarted')

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
        <View style={{flexDirection: 'row-reverse'}}>
        <DrawerTrigger/>
        </View>        
        <AppLogo />
        <View>
          <Text style={[styles.textStyle, homeStyles.headerStyle]}>Calculate your homes solar enegry potential</Text>
        </View>
        <View>
          <Text style={styles.subTextStyle}>Do you know the size of the area where you wish to install solar panels ?</Text>
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
