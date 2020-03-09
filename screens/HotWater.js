import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/HotWaterStyles';
import Header from '../components/Header';
import BathPic from '../components/Bath';
import helperFunctions from '../sharedFunctions';

class HotWater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotWater: ''
    };
  }

  goToTimeOccupied = () => this.props.navigation.navigate('TimeOccupied');

  saveState = (value) => {
    this.setState({
      hotWater: value
    }, () => {
      helperFunctions.saveData('hotWater', value);
    });    
  }

  checkForEntry = () => {
    if (this.state.hotWater === '') {
      this.setState({
        showError: true
      });
    } else {
      this.goToTimeOccupied();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <BathPic />
        <View style={customStyles.questionStyle}>
          <Text style={styles.textStyle}>Do you want to heat domestic hot water?</Text>
          <Text style={styles.answerTextStyle}>{this.state.hotWater}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => this.saveState('Yes')}>
            <Text style={[styles.button, customStyles.button]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.saveState('No')}>
            <Text style={[styles.button, customStyles.button]}>No</Text>
          </TouchableOpacity>
        </View>
        {this.state.showError && (
            <ErrorMessage errorValue={'*Please select an option'} />
          )}
        <TouchableOpacity onPress={() => this.checkForEntry()}>
          <Text style={styles.nextButton}>Next Step</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(HotWater)
