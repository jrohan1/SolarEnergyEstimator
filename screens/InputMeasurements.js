import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { Icon } from 'native-base';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import { styles } from '../stylesheets/MainStyles';
import helperFunctions from '../sharedFunctions';

class InputMeasurements extends Component {
  goToOrientation = () => this.props.navigation.navigate('Orientation');
  goToHome = () => this.props.navigation.navigate('Home');

  constructor(props) {
    super(props)
    this.state = {
      areas: [],
      pitches: [],
      textInputArea: [],
      textInputPitch: []
    }
  }

  componentWillMount = () => {
    this.addAreaTextInput(this.state.textInputArea.length);
    this.addPitchTextInput(this.state.textInputPitch.length);
  }

  addAreaTextInput = (index) => {
    let textInputArea = this.state.textInputArea;
    textInputArea.push(
      <View key={index} style={styles.textInput}>
        <TextInput key={index}
          style={styles.inputStyle}
          placeholder='m2'
          placeholderTextColor='#4160A1'
          keyboardType='numeric'
          returnKeyType='done'
          blurOnSubmit
          onChangeText={(area) => {
            let areas = this.state.areas;
            areas[index] = area;
            this.setState({ areas })
          }}
          value={this.state.areas[index] ? `${this.state.areas[index]}` : null}
        /></View>);
    this.setState({ textInputArea })
  }

  addPitchTextInput = (index) => {
    let textInputPitch = this.state.textInputPitch;
    textInputPitch.push(
      <View key={index} style={styles.textInput}>
        <TextInput
          style={styles.inputStyle}
          placeholder='degrees'
          placeholderTextColor='#4160A1'
          keyboardType='numeric'
          returnKeyType='done'
          blurOnSubmit
          onChangeText={(pitch) => {
            let pitches = this.state.pitches;
            pitches[index] = pitch;
            this.setState({ pitches })
          }}
          value={this.state.pitches[index] ? `${this.state.pitches[index]}` : null}
        />
      </View>);
    this.setState({
      textInputPitch,
      showError: false
    })
  }

  submitInput = () => {
    if (this.state.areas.length === 0 || this.state.pitches.length === 0) {
      this.setState({
        showError: true
      });
    } else if (this.state.areas.length < this.state.pitches.length) {
      this.setState({
        showAreaError: true
      });
    } else if (this.state.areas.length > this.state.pitches.length) {
      this.setState({
        showPitchError: true
      });
    } else {
      this.setState({
        isSubmitted: true
      }, () => {
        helperFunctions.saveArrayData('areas', this.state.areas);
        helperFunctions.saveArrayData('pitch', this.state.pitches);
      }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header />
          <View style={{marginTop: 30}}>
            <View style={styles.questionStyle}>
              <Text style={styles.textStyle}>Please enter area in m2</Text>
            </View>
            {this.state.showAreaError && !this.state.isSubmitted && (
              <ErrorMessage errorValue={'*Please input an area for every pitch'} />
            )}
            {this.state.textInputArea.map((value, index) => {
              return value
            })}

          </View>
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Please enter pitch in degrees</Text>
            <Text style={styles.subTextStyle}>*Typically between 30 to 40 degrees</Text>
          </View>
          {this.state.showPitchError && !this.state.isSubmitted && (
            <ErrorMessage errorValue={'*Please input a pitch for every area'} />
          )}
          {this.state.textInputPitch.map((value, index) => {
            return value
          })}
          {this.state.isSubmitted && (
            <View>
              <Icon active type="FontAwesome" name="check" style={styles.checkMarkStyle} />
            </View>
          )}
          {this.state.showError && !this.state.isSubmitted && (
            <ErrorMessage errorValue={'*Please input a value for area and pitch'} />
          )}
          {!this.state.isSubmitted && (
            <TouchableOpacity onPress={() => { this.addAreaTextInput(this.state.textInputArea.length); this.addPitchTextInput(this.state.textInputPitch.length) }}>
              <Text style={styles.nextButton}>Add additional area and pitch</Text>
            </TouchableOpacity>
          )}
          {!this.state.isSubmitted ?
            <TouchableOpacity onPress={() => this.submitInput()}>
              <Text style={styles.nextButton}>Submit</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.goToOrientation}>
              <Text style={styles.nextButton}>Next Step</Text>
            </TouchableOpacity>
          }
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(InputMeasurements)