import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import Header from '../components/Header';
import { styles } from '../stylesheets/MainStyles';
import CastingShade from '../components/CastingShade';
import helperFunctions from '../sharedFunctions';

class Shading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shading: ''
    };
  }

  goToEnergyUsage = () => this.props.navigation.navigate('EnergyUsage')

  saveState = (value) => {
    this.setState({
      shading: value
    }, () => {
      helperFunctions.saveData('shading', value);
    });    
  };

  checkForEntry = () => {
    if (this.state.shading === '') {
      this.setState({
        showError: true
      });
    } else {
      this.goToEnergyUsage();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          <CastingShade />
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Is the selected area under any shade?</Text>
            <Text style={styles.answerTextStyle}>{this.state.shading}</Text>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.saveState('None')}>
              <Text style={styles.button}>None</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.saveState('A little')}>
              <Text style={styles.button}>A little</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.saveState('Some')}>
              <Text style={styles.button}>Some</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.saveState('A lot')}>
              <Text style={styles.button}>A lot</Text>
            </TouchableOpacity>
          </View>
          {this.state.showError && (
            <ErrorMessage errorValue={'*Please select an option'} />
          )}
          <TouchableOpacity onPress={() => this.checkForEntry()}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Shading)
