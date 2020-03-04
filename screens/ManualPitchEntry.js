import React, { Component } from 'react';
import { AsyncStorage, Button, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { Icon } from 'native-base';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import { styles } from '../stylesheets/MainStyles';
import helperFunctions from '../sharedFunctions';

class ManualPitchEntry extends Component {
  goToOrientation = () => this.props.navigation.navigate('Orientation');

  constructor(props) {
    super(props)
    this.state = {
      areas: [],
      pitches: []
    }
  }

  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ areas: JSON.parse(value) }));
  }

  submitInput = () => {
    if (this.state.pitches.length === 0) {
      this.setState({
        showError: true
      });
    } else if (this.state.areas.length > this.state.pitches.length) {
      this.setState({
        showPitchError: true
      });
    } else {
      this.setState({
        isSubmitted: true
      }, () => {
        helperFunctions.saveArrayData('pitch', this.state.pitches);
        this.goToOrientation();
      }
      );
    }
  }

  render() {
    const pitches = this.state.areas.map(
      (areas, index) => (
        <View key={index} style={styles.textInput}>
          <TextInput
            key={index}
            style={styles.inputStyle}
            placeholder='degrees'
            placeholderTextColor='#4160A1'
            keyboardType='numeric'
            returnKeyType='done'
            blurOnSubmit
            onChangeText={(pitch) => {
              if (pitch > 90) {
                this.setState({
                  showPitchToLarge: true
                });
              } else {
                let pitches = this.state.pitches;
                pitches[index] = pitch;
                this.setState({
                  pitches,
                  showPitchToLarge: false
                })
              }
            }}
            value={this.state.pitches[index] ? `${this.state.pitches[index]}` : null}
          />
        </View>
      )
    )
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header />
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <View style={styles.questionStyle}>
              <Text style={styles.textStyle}>Please enter the pitch of the roof for each area that you have marked.</Text>
              <Text style={styles.subTextStyle}>*Typically between 30 to 40 degrees</Text>
            </View>
            {pitches}
            {this.state.showError && !this.state.isSubmitted && (
              <ErrorMessage errorValue={'*Please input a value for pitch'} />
            )}
            {this.state.showPitchError && !this.state.isSubmitted && (
              <ErrorMessage errorValue={'*Please input a pitch for every area'} />
            )}
            {this.state.showPitchToLarge && !this.state.isSubmitted && (
              <ErrorMessage errorValue={'*Pitch must be less than 90 degrees'} />
            )}
          </View>
          <TouchableOpacity onPress={() => { this.setState({ submitted: true }); this.submitInput() }}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(ManualPitchEntry)