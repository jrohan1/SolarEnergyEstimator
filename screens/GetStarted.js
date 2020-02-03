import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/GetStartedStyles'
import MenuButton from '../components/MenuButton'

class GetStarted extends Component {

  goToMeasurementTool = () => this.props.navigation.navigate('MeasurementTool')

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <View style={styles.infoMessageStyle}>
          <Text style={styles.textStyle}>To help you to calculate your homes energy potential we are providing you with some easy to use tools.</Text>
          <Text style={styles.headerStyle}>First Step:</Text>
          <Text style={styles.textStyle}>Measure the area where you wish to fit solar panels.</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.goToMeasurementTool}>
            <Text style={styles.button}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default withFirebaseHOC(GetStarted)
