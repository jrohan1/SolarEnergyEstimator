import React, { Component } from 'react';
import { AsyncStorage, Button, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { Icon } from 'native-base';
import SmallLogo from '../components/SmallLogo';
import MenuButton from '../components/MenuButton';
import { styles } from '../stylesheets/MainStyles';
import helperFunctions from '../sharedFunctions';

class ManualPitchEntry extends Component {
  goToPitchFinder = () => this.props.navigation.navigate('PitchFinder');
  goToOrientation = () => this.props.navigation.navigate('Orientation');
  goToHome = () => this.props.navigation.navigate('Home');

  constructor(props) {
    super(props)
    this.state = {
      area: [],
      pitches: []
    }
  }

  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ area: JSON.parse(value) }));
  }

  submitInput = () => {
    helperFunctions.saveArrayData('pitch', this.state.pitches);
  }

  render() {
    const pitches = this.state.area.map(
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
              let pitches = this.state.pitches;
              pitches[index] = pitch;
              this.setState({ pitches })
            }}
            value={this.state.pitches[index] ? `${this.state.pitches[index]}` : null}
          />
        </View>
      )
    )
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={{ marginBottom: 25 }} onPress={this.goToHome}>
            <SmallLogo />
            <MenuButton navigation={this.props.navigation} />
          </TouchableOpacity>
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Please enter the pitch of the roof for each area that you have marked.</Text>
          </View>
          {pitches}
          {this.state.submitted && (
            <View>
              <Icon active type="FontAwesome" name="check" style={styles.checkMarkStyle} />
            </View>
          )}
          <TouchableOpacity onPress={() => { this.setState({ submitted: true }); this.submitInput() }}>
            <Text style={styles.nextButton}>Submit</Text>
          </TouchableOpacity>
          {this.state.submitted && (
            <TouchableOpacity onPress={this.goToOrientation}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(ManualPitchEntry)