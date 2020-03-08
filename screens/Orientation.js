import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Card, CardItem, Body, Right, Left } from 'native-base';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/OrientationStyle';
import Header from '../components/Header';
import Compass from '../components/Compass';
import helperFunctions from '../sharedFunctions';
import Emoji from 'react-native-emoji';

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
    } else {
      this.setState({
        showSubmit: true
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
    this.setState({
      isSubmitted: true,
      orientations: []
    }, () => {
      this.addOrientationToArray(),
        this.goToShading()
    })
  }

  addOrientationToArray = () => {
    if (this.state.orientation !== '') {
      this.setState(state => {
        const orientations = state.orientations.concat(state.orientation);
        return {
          orientations,
          orientation: '',
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
        <Header />
        <ScrollView>
          {this.state.showCard ?
            <Card style={[styles.cardStyle, customStyles.card]}>
              <CardItem>
                <Left></Left>
                <Body></Body>
                <Right>
                  <TouchableOpacity success onPress={() => this.setState({ showCard: false })}>
                    <Icon active type="FontAwesome" name="close" style={styles.closeButtonStyle} />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>The sun rises in the East and sets in the West.</Text>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>Which side of your house get's the sun in the morning ?</Text>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>Which side of your house get's the sun in the evening ?</Text>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>The sun will move from East to West passing South.</Text>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>Solar panels that face South are the most efficient.</Text>
              </CardItem>
              <CardItem>
                <Text style={styles.cardTextStyle}>SouthEast or SouthWest is slightly less efficient, roughly 5% less.</Text>
              </CardItem>
              <CardItem>
              </CardItem>
            </Card>
            :
            <View>
              <Compass />

              <View style={styles.questionStyle}>
                <Text style={styles.textStyle}>Which direction will the solar panels face ?</Text>
                <View style={customStyles.group}>
                  <TouchableOpacity onPress={() => this.setState({ showCard: true })}>
                    <Text style={[styles.subTextStyle, customStyles.infoStyle]}>How do I know ?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({ showCard: true })}>
                    <Emoji name="confused" style={customStyles.emoji} />
                  </TouchableOpacity>
                </View>
                {this.state.selected && (
                  <Text style={styles.answerTextStyle}>{this.state.orientation}</Text>
                )}
                {!this.state.isSubmitted && (
                  allOrientations
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
              {this.state.showSubmit && (
                <TouchableOpacity onPress={() => this.isSubmitted()}>
                  <Text style={styles.nextButton}>Next Step</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Orientation)
