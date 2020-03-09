import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/GetStartedStyles';

class GetStarted extends Component {

  goToMeasurementTool = () => this.props.navigation.navigate('MeasurementTool')

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={customStyles.infoMessageStyle}>
          <Text style={styles.textStyle}>To help you calculate your homes energy potential we are providing you with some easy to use tools.</Text>
          <Text style={customStyles.headerStyle}>First Step:</Text>
          <Text style={styles.textStyle}>Measure the area where you wish to fit solar panels.</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.goToMeasurementTool}>
            <Text style={[styles.button, customStyles.button]}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default withFirebaseHOC(GetStarted)
