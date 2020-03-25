import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'native-base';
import Header from '../components/Header';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { pitchMenuStyles } from '../stylesheets/PitchMenuStyles';
import helperFunctions from '../sharedFunctions';
import { customStyles } from '../stylesheets/ReportStyles';

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
                <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>This will be determined by the pitch of your roof.</Text>
                <Text style={[styles.subTextStyle, pitchMenuStyles.textStyle]}>*Typically between 30 to 40 degrees</Text>
                <TouchableOpacity onPress={this.goToManualPitchEntry}>
                  <Text style={[styles.nextButton, pitchMenuStyles.button]}>I know the pitch</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToPitchFinder}>
                  <Text style={[styles.nextButton, pitchMenuStyles.button]}>I don't know the pitch</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(PitchMenu)