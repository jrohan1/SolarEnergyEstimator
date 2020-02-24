import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/OrientationStyle';
import Header from '../components/Header';
import Compass from '../components/Compass';
import helperFunctions from '../sharedFunctions';

class Orientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      orientation: '',
      orientations: [],
      addOrientation: true
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
      orientation: value,
      selected: true,
      showError: false
    });
  }

  checkForMultipleAreas = () => {
    if (this.state.area.length > 1) {
      this.setState({
        multipleAreas: true
      })
    }
  }

  addOrientation = () => {
    if (this.state.area.length === this.state.orientations.length) {
      this.setState({
        addOrientation: false,
        showSubmit: true
      })
    }
  }

  isSubmitted = () => {
    if (this.state.addOrientation === false) {
      this.setState({
        isSubmitted: true
      }, () => {
        this.addOrientationToArray()
      })
    }
  }

  addOrientationToArray = () => {
    if (this.state.orientation !== '') {
      this.setState(state => {
        const orientations = state.orientations.concat(state.orientation);
        return {
          orientations,
          orientation: '',
          secondOrientation: true
        };
      }, () => {
        helperFunctions.saveArrayData('orientation', this.state.orientations);
        this.addOrientation();
      });
    }
    this.setState({
      showError: true
    })
  }

  render() {
    const allOrientations = this.state.orientations.map(
      (orientations, index) => (
        <Text key={index} style={styles.answerTextStyle}>Area {index + 1}: {orientations} </Text>
      )
    )
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          <Compass />
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Which direction will the solar panels face ?</Text>
            {this.state.selected && !this.state.showSubmit && (
              <Text style={styles.answerTextStyle}>Selected: {this.state.orientation}</Text>
            )}
            {!this.state.isSubmitted && (
              allOrientations
            )}
            {this.state.isSubmitted && (
            <View>
              <Icon active type="FontAwesome" name="check" style={styles.checkMarkStyle} />
            </View>
          )}
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
          {this.state.showError && !this.state.showSubmit && (
            <ErrorMessage errorValue={'*Please add orientation for each area measured'} />
          )}
          {this.state.multipleAreas && this.state.addOrientation && (
            <TouchableOpacity onPress={() => this.addOrientationToArray()}>
              <Text style={styles.nextButton}>Add orienatation</Text>
            </TouchableOpacity>
          )}
          {this.state.showSubmit && !this.state.isSubmitted && (
            <TouchableOpacity onPress={() => this.isSubmitted()}>
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
