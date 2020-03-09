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

  saveState = (value) => {
    if (value === 'None') {
      this.setState({
        shading: value,
        isSelectedNone: true,
        isSelectedLittle: false,
        isSelectedSome: false,
        isSelectedAlot: false
      }, () => {
        helperFunctions.saveData('shading', value);
      });
    } else if (value === 'A little') {
      this.setState({
        shading: value,
        isSelectedNone: false,
        isSelectedLittle: true,
        isSelectedSome: false,
        isSelectedAlot: false
      }, () => {
        helperFunctions.saveData('shading', value);
      });
    } else if (value === 'Some') {
      this.setState({
        shading: value,
        isSelectedNone: false,
        isSelectedLittle: false,
        isSelectedSome: true,
        isSelectedAlot: false
      }, () => {
        helperFunctions.saveData('shading', value);
      });
    } else if (value === 'A lot') {
      this.setState({
        shading: value,
        isSelectedNone: false,
        isSelectedLittle: false,
        isSelectedSome: false,
        isSelectedAlot: true
      }, () => {
        helperFunctions.saveData('shading', value);
      });
    }
  }

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
        <Header />
        <ScrollView>
          <CastingShade />
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Is the selected area under any shade?</Text>
          </View>
          <View style={styles.buttonStyle}>
            {!this.state.isSelectedNone ?
              <TouchableOpacity onPress={() => this.saveState('None')}>
                <Text style={styles.button}>None</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={() => this.saveState('None')}>
                <Text style={styles.selectedButton}>None</Text>
              </TouchableOpacity>
            }
            {!this.state.isSelectedLittle ?
              <TouchableOpacity onPress={() => this.saveState('A little')}>
                <Text style={styles.button}>A little</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('A little')}>
                <Text style={styles.selectedButton}>A little</Text>
              </TouchableOpacity>
            }
            {!this.state.isSelectedSome ?
              <TouchableOpacity onPress={() => this.saveState('Some')}>
                <Text style={styles.button}>Some</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('Some')}>
                <Text style={styles.selectedButton}>Some</Text>
              </TouchableOpacity>
            }
            {!this.state.isSelectedAlot ?
              <TouchableOpacity onPress={() => this.saveState('A lot')}>
                <Text style={styles.button}>A lot</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.saveState('A lot')}>
                <Text style={styles.selectedButton}>A lot</Text>
              </TouchableOpacity>
            }
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
