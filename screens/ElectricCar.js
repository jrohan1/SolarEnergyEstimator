import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/ElectricCarStyles';
import Header from '../components/Header';
import ElectricCarPic from '../components/ElectricCar';
import helperFunctions from '../sharedFunctions';

class ElectricCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useElectricCar: ''
    };
  }

  goToHotWater = () => this.props.navigation.navigate('HotWater')
  
  saveState = (value) => {
    this.setState({
      useElectricCar: value
    }, () => {
      helperFunctions.saveData('useElectricCar', value);
    });    
  }

  checkForEntry = () => {
    if (this.state.useElectricCar === '') {
      this.setState({
        showError: true
      });
    } else {
      this.goToHotWater();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <ElectricCarPic />
        <View style={styles.questionStyle}>
          <Text style={styles.textStyle}>Do you have / plan to have an electric car?</Text>
          <Text style={styles.answerTextStyle}>{this.state.useElectricCar}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={()=> this.saveState('Yes')}>
            <Text style={[styles.button, customStyles.button]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.saveState('No')}>
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

export default withFirebaseHOC(ElectricCar)
