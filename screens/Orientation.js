import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/OrientationStyle';
import MenuButton from '../components/MenuButton';
import Compass from '../components/Compass';
import helperFunctions from '../sharedFunctions';

class Orientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      orientation: '',
      orientations: [],
    };
  }
  goToShading = () => this.props.navigation.navigate('Shading');

  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ area: JSON.parse(value) }));
  }

  saveState = (value) => {
    this.setState({
      orientation: value
    });
  }

  checkForMultipleAreas = () => {
    if (this.state.area.length > 1) {
      this.setState({
        multipleAreas: true
      })
    }
  }

  addOrientationToArray = () => {
    this.setState(state => {
      const orientations = state.orientations.concat(state.orientation);
      return {
        orientations,
        orientation: '',
        secondOrientation: true
      };
    }, () => {
      helperFunctions.saveArrayData('orientation', this.state.orientations);
    });
  }

  render() {
    const allOrientations = this.state.orientations.map(
      (orientations, index) => (
        <Text key={index} style={styles.answerTextStyle}>{orientations} </Text>
      )
    )
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <ScrollView>
          <Compass />
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Which direction will the solar panels face ?</Text>
            {!this.state.isSubmitted ?
              <Text style={styles.answerTextStyle}>{this.state.orientation}</Text>
              :
              allOrientations
            }
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => { this.saveState('South'); this.checkForMultipleAreas() }}>
              <Text style={[styles.button, customStyles.button]}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.saveState('SouthWest'); this.checkForMultipleAreas() }}>
              <Text style={[styles.button, customStyles.button]}>S/W</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.saveState('SouthEast'); this.checkForMultipleAreas() }}>
              <Text style={[styles.button, customStyles.button]}>S/E</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => { this.saveState('East'); this.checkForMultipleAreas() }}>
              <Text style={[styles.button, customStyles.button]}>E</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.saveState('West'); this.checkForMultipleAreas() }}>
              <Text style={[styles.button, customStyles.button]}>W</Text>
            </TouchableOpacity>
          </View>
          {this.state.isSubmitted && (
            <View>
              <Icon active type="FontAwesome" name="check" style={styles.checkMarkStyle} />
            </View>
          )}
          {this.state.multipleAreas && !this.state.secondOrientation && (
            <TouchableOpacity onPress={() => this.addOrientationToArray()}>
              <Text style={styles.nextButton}>Add orienatation of second area</Text>
            </TouchableOpacity>
          )}
          {!this.state.isSubmitted && (
            <TouchableOpacity onPress={() => { this.setState({ isSubmitted: true }); this.addOrientationToArray() }}>
              <Text style={styles.nextButton}>Submit</Text>
            </TouchableOpacity>
          )}
          {this.state.isSubmitted && (
            <TouchableOpacity onPress={this.goToShading}>
              <Text style={styles.nextButton}>Next Step</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Orientation)
