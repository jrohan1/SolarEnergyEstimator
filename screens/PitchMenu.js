import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import SmallLogo from '../components/SmallLogo';
import MenuButton from '../components/MenuButton';
import { styles } from '../stylesheets/MainStyles';
import { pitchMenuStyles } from '../stylesheets/PitchMenuStyles';
import helperFunctions from '../sharedFunctions';

class PitchMenu extends Component {
  goToPitchFinder = () => this.props.navigation.navigate('PitchFinder');
  goToManualPitch = () => this.props.navigation.navigate('ManualPitch');
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
          <TouchableOpacity style={{ marginBottom: 25 }} onPress={this.goToHome}>
            <SmallLogo />
            <MenuButton navigation={this.props.navigation} />
          </TouchableOpacity>
          <View style={styles.questionStyle}>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>To accurately calculate the potential energy output of your solar panels we need to know the tilt of the panels.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>This will be determined by the pitch of your roof.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>If you know the pitch please click Enter Pitch.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>Enter the pitch for each area that you have marked.</Text>
          </View>
          <TouchableOpacity onPress={this.goToManualPitch}>
            <Text style={styles.nextButton}>Enter Pitch</Text>
          </TouchableOpacity>
          <View style={[styles.questionStyle, pitchMenuStyles.spacingStyle]}>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>If you do not know the pitch please use our Pitch Finder.</Text>
            <Text style={[styles.textStyle, pitchMenuStyles.textStyle]}>When you exit the Pitch Finder you can enter the values on the next screen.</Text>
          </View>
          <TouchableOpacity onPress={this.goToPitchFinder}>
            <Text style={styles.nextButton}>Find Pitch</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(PitchMenu)