import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/TimeOccupiedStyles';
import MenuButton from '../components/MenuButton';
import EnergyUse from '../components/EnergyUsage';

class TimeOccupied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      value: 0
    };
  }

  goToTimeOccupied = () => this.props.navigation.navigate('TimeOccupied')

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <ScrollView>
          <EnergyUse />
          <View style={customStyles.questionStyle}>
            <Text style={styles.textStyle}>Select time of day when most energy is consumed</Text>
            <Text style={styles.answerTextStyle}>{this.state.time}</Text>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({ time: 'Morning', value: 1 })}>
              <Text style={[styles.button, customStyles.button]}>Morning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ time: 'Afternoon', value: 2 })}>
              <Text style={[styles.button, customStyles.button]}>Afternoon</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({ time: 'Evening', value: 3 })}>
              <Text style={[styles.button, customStyles.button]}>Evening</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ time: 'All Day', value: 4 })}>
              <Text style={[styles.button, customStyles.button]}>All Day</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.goToTimeOccupied}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(TimeOccupied)
