import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import AppLogo from '../components/AppLogo'

class Home extends Component {
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
        <AppLogo/>
        <View>
          <Text style={styles.headerStyle}>Calculate your homes solar enegry potential</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Do you know your roof measurements ?</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={this.handlPress}>
            <Text style={styles.button}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlPress}>
            <Text style={styles.button}>No</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonStyle}>
        <Button
          title="Login"
          te
          onPress={this.goToLogin}
          titleStyle={{
            fontSize: 20,
            color: '#DEE48E',
            borderBottomWidth: 1,
            borderColor: '#DEE48E',
            marginLeft: 20
          }}
          type='clear'
        />
        <Text style={styles.orStyle}>or</Text>
        <Button
          title="Sign up"
          onPress={this.goToSignup}
          titleStyle={{
            fontSize: 20,
            color: '#DEE48E',
            borderBottomWidth: 1,
            borderColor: '#DEE48E'
          }}
          type='clear'
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#DEE48E',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: '#4160A1',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    width:160,
    borderRadius:10,
    marginLeft :10,
    marginRight:10,
    marginTop :30,
    marginBottom: 30,
  },
  buttonStyle: {
    flexDirection: 'row',
  },
  headerStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10,
    marginBottom: 50
  }, 
  textStyle: {
    fontSize: 20,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10
  },
  orStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    lineHeight: 38,
    marginLeft :10,
    marginRight:10
  }

})

export default withFirebaseHOC(Home)
