import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'native-base';
import Header from '../components/Header';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { pitchMenuStyles } from '../stylesheets/PitchMenuStyles';
import helperFunctions from '../sharedFunctions';

class PitchMenu extends Component {
  goToPitchFinder = () => this.props.navigation.navigate('PitchFinder');
  goToManualPitchEntry = () => this.props.navigation.navigate('ManualPitchEntry');
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
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header/>
          <View style={{marginTop: 30}}>
          <Card style={pitchMenuStyles.cardStyle}>
          <View style={styles.questionStyle}>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>To accurately calculate the potential energy output of your solar panels we need to know the tilt of the panels.</Text>
          </View>
          </Card>
          </View>
          <Card style={pitchMenuStyles.cardStyle}>
          <View style={styles.questionStyle}>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>This will be determined by the pitch of your roof.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>If you know the pitch please click Enter Pitch.</Text>
            <Text style={[styles.subTextStyle, pitchMenuStyles.textStyle]}>*Typically between 30 to 40 degrees</Text>
            <Text style={[styles.subTextStyle, pitchMenuStyles.textStyle]}>*Enter the pitch for each area that you have marked.</Text>
          </View>
          <TouchableOpacity onPress={this.goToManualPitchEntry}>
            <Text style={styles.nextButton}>Enter Pitch</Text>
          </TouchableOpacity>
          </Card>
          <Card style={pitchMenuStyles.cardStyle}>
          <View style={[styles.questionStyle, pitchMenuStyles.spacingStyle]}>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>If you do not know the pitch please use our Pitch Finder.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>To get the most accurate measurement, stand directly opposite the central apex of your roof.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>Tilt phone horizontally to match the pitch.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>Click on the save button to hold the angle on screen</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>When you exit the Pitch Finder you can enter the angle on the next screen.</Text>
          </View>
          <TouchableOpacity onPress={this.goToPitchFinder}>
            <Text style={styles.nextButton}>Find Pitch</Text>
          </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(PitchMenu)