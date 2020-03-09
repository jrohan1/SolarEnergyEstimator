import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/TimeOccupiedStyles';
import Header from '../components/Header';
import EnergyUse from '../components/EnergyUsage';
import helperFunctions from '../sharedFunctions';

class TimeOccupied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  goToReport = () => this.props.navigation.navigate('Report')

  saveState = (value) => {
    if (value === 'Morning') {
      this.setState({
        time: value,
        isSelectedMorning: true,
        isSelectedAfternoon: false,
        isSelectedEvening: false,
        isSelectedAll: false
      }, () => {
        helperFunctions.saveData('timeOccupied', value);
      });
    } else if (value === 'Afternoon') {
      this.setState({
        time: value,
        isSelectedMorning: false,
        isSelectedAfternoon: true,
        isSelectedEvening: false,
        isSelectedAll: false
      }, () => {
        helperFunctions.saveData('timeOccupied', value);
      });
    } else if (value === 'Evening') {
      this.setState({
        time: value,
        isSelectedMorning: false,
        isSelectedAfternoon: false,
        isSelectedEvening: true,
        isSelectedAll: false
      }, () => {
        helperFunctions.saveData('timeOccupied', value);
      });
    } else if (value === 'All Day') {
      this.setState({
        time: value,
        isSelectedMorning: false,
        isSelectedAfternoon: false,
        isSelectedEvening: false,
        isSelectedAll: true
      }, () => {
        helperFunctions.saveData('timeOccupied', value);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <EnergyUse />
          <View style={customStyles.questionStyle}>
            <Text style={styles.textStyle}>Select time of day when most energy is consumed</Text>
          </View>
          <View style={styles.buttonStyle}>
            {!this.state.isSelectedMorning ?
              <TouchableOpacity onPress={() => this.saveState('Morning')}>
                <Text style={[styles.button, customStyles.button]}>Morning</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('Morning')}>
                <Text style={[styles.selectedButton, customStyles.button]}>Morning</Text>
              </TouchableOpacity>
            }
            {!this.state.isSelectedAfternoon ?
              <TouchableOpacity onPress={() => this.saveState('Afternoon')}>
                <Text style={[styles.button, customStyles.button]}>Afternoon</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('Afternoon')}>
                <Text style={[styles.selectedButton, customStyles.button]}>Afternoon</Text>
              </TouchableOpacity>
            }

          </View>
          <View style={styles.buttonStyle}>
            {!this.state.isSelectedEvening ?
              <TouchableOpacity onPress={() => this.saveState('Evening')}>
                <Text style={[styles.button, customStyles.button]}>Evening</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('Evening')}>
                <Text style={[styles.selectedButton, customStyles.button]}>Evening</Text>
              </TouchableOpacity>
            }
            {!this.state.isSelectedAll ?
              <TouchableOpacity onPress={() => this.saveState('All Day')}>
                <Text style={[styles.button, customStyles.button]}>All Day</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('All Day')}>
                <Text style={[styles.selectedButton, customStyles.button]}>All Day</Text>
              </TouchableOpacity>
            }
          </View>
          <TouchableOpacity onPress={this.goToReport}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(TimeOccupied)
