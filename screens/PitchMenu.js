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
          <Header />
          <View style={{ marginTop: 30 }}>
            <Card style={pitchMenuStyles.cardStyle}>
              <View style={styles.questionStyle}>
                <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>To accurately calculate the potential energy output of your solar panels we need to know the tilt of the panels.</Text>
              </View>
            </Card>
          </View>
          <Card style={pitchMenuStyles.cardStyle}>
            <View style={styles.questionStyle}>
              <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>This will be determined by the pitch of your roof.</Text>
              <Text style={[styles.subTextStyle, pitchMenuStyles.textStyle]}>*Typically between 30 to 40 degrees</Text>
              <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>If you know the pitch please click </Text>
              <TouchableOpacity onPress={this.goToManualPitchEntry}>
                <Text style={styles.nextButton}>Enter Pitch</Text>
              </TouchableOpacity>
              <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>Otherwise click</Text>
              <TouchableOpacity onPress={this.goToPitchFinder}>
              <Text style={styles.nextButton}>Find Pitch</Text>
            </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(PitchMenu)