import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/HomeStyles'
import AppLogo from '../components/AppLogo'
import MenuButton from '../components/MenuButton'

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
          <MenuButton navigation={this.props.navigation} />
          <AppLogo />
          <View>
            <Text style={styles.headerStyle}>Calculate your homes solar enegry potential</Text>
          </View>
          {/* <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        /> */}
          <View>
            <Text style={styles.textStyle}>Do you know your roof measurements ?</Text>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={this.goToInputMeasurements}>
              <Text style={styles.button}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToGetStarted}>
              <Text style={styles.button}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Login"
              te
              onPress={this.goToLogin}
              titleStyle={styles.loginButtonStyle}
              type='clear'
            />
            <Text style={styles.subTextStyle}>or</Text>
            <Button
              title="Sign up"
              onPress={this.goToSignup}
              titleStyle={styles.loginButtonStyle}
              type='clear'
            />
          </View>
       
      </View>
    )
  }
}

export default withFirebaseHOC(Home)
