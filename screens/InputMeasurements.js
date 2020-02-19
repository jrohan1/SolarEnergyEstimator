import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { Icon } from 'native-base';
import SmallLogo from '../components/SmallLogo';
import MenuButton from '../components/MenuButton';
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
            areas[0] = area;
            this.setState({ areas })
          }}
          value={this.state.areas[0] ? `${this.state.areas[0]}` : null}
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
            pitches[0] = pitch;
            this.setState({ pitches })
          }}
          value={this.state.pitches[0] ? `${this.state.pitches[0]}` : null}
        />
      </View>);

    this.setState({ textInputPitch })
  }

  submitInput = () => {
    helperFunctions.saveArrayData('areas', this.state.areas);
    helperFunctions.saveArrayData('pitch', this.state.pitches);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={{ marginBottom: 15 }} onPress={this.goToHome}>
            <SmallLogo />
            <MenuButton navigation={this.props.navigation} />
          </TouchableOpacity>
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Please enter area in m2</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              placeholder='m2'
              placeholderTextColor='#4160A1'
              keyboardType='numeric'
              returnKeyType='done'
              blurOnSubmit
              onChangeText={(area) => {
                let areas = this.state.areas;
                areas[0] = area;
                this.setState({ areas })
              }}
              value={this.state.areas[0] ? `${this.state.areas[0]}` : null}
            />
          </View>
          {this.state.textInputArea.map((value, index) => {
            return value
          })}
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Please enter pitch in degrees</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              placeholder='degrees'
              placeholderTextColor='#4160A1'
              keyboardType='numeric'
              returnKeyType='done'
              blurOnSubmit
              onChangeText={(pitch) => {
                let pitches = this.state.pitches;
                pitches[0] = pitch;
                this.setState({ pitches })
              }}
              value={this.state.pitches[0] ? `${this.state.pitches[0]}` : null}
            />
          </View>
          {this.state.textInputPitch.map((value, index) => {
            return value
          })}
          {this.state.submitted && (
            <View>
              <Icon active type="FontAwesome" name="check" style={styles.checkMarkStyle} />
            </View>
          )}
          <TouchableOpacity onPress={() => { this.addAreaTextInput(this.state.textInputArea.length); this.addPitchTextInput(this.state.textInputPitch.length)}}>
            <Text style={styles.nextButton}>Add additional area and pitch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.setState({ submitted: true }); this.submitInput() }}>
            <Text style={styles.nextButton}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToOrientation}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(InputMeasurements)