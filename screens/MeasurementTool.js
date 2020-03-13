import React, { Component } from 'react';
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TextInput, Dimensions, Keyboard, TouchableHighlight, TouchableOpacity, ScrollView } from "react-native";
import { Icon, Card, CardItem, Body, Right, Left } from 'native-base';
import MapView, { Marker, Polygon, ProviderPropType } from 'react-native-maps';
import { customStyles } from '../stylesheets/MeasurementToolStyles';
import { styles } from '../stylesheets/MainStyles';
import config from '../config';
import _ from 'lodash';
import axios from 'axios';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import helperFunctions from '../sharedFunctions';

const { height, width } = Dimensions.get('window');
const INITIAL_LATITUDE_DELTA = 5.5;
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * (width / height);
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
let id = 0;

class MeasurementTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 53.2734,
      longitude: -7.77832031,
      latitudeDelta: INITIAL_LATITUDE_DELTA,
      longitudeDelta: INITIAL_LONGITUDE_DELTA,
      destination: '',
      predictions: [],
      polygons: [],
      editing: null,
      canEdit: false,
      creatingPolygon: false,
      areaTotal: false,
      newArea: '',
      areas: [],
      showCard: true,
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      300
    );
  };

  goToGetStarted = () => this.props.navigation.navigate('GetStarted');
  goToPitchMenu = () => this.props.navigation.navigate('PitchMenu');
  goToTutorial = () => this.props.navigation.navigate('MapTutorial');

  onChangeDestination = async (destination) => {
    this.setState({ destination });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${config.GOOGLE_PLACES_API_KEY}&input=${destination}&${this.state.latitude}, ${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      });
    } catch (err) {
      console.log(err);
    }
  }

  selectedPrediction = (prediction) => {
    Keyboard.dismiss();
    this.setState({
      predictions: [],
      destination: prediction.description,
      predictionSelected: true
    });
    Keyboard;
    this.handleSubmit(this.state.destination);
  }

  handleSubmit = (textInput) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destination.split(' ').join('+')}+ireland&key=${config.GOOGLE_PLACES_API_KEY}`)
      .then(response => this.updateLocationCoordinates(response))
      .catch(error => console.log("Failjax: ", error))
  }

  updateLocationCoordinates = (response) => {
    var info = response.data.results[0].geometry.location
    this.setState({
      latitude: info.lat,
      longitude: info.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
  }

  finishEditingPolygon = () => {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingPolygon: false,
      canEdit: false
    });
  }

  markAnotherArea = () => {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingPolygon: false,
      canEdit: true,
      isSecondArea: true
    });
  }

  deletePolygon = () => {
    this.setState({
      polygons: [],
      areas: [],
      canEdit: true,
      editing: null,
      isSecondArea: false
    })
  }

  newLoc = () => {
    const polygonArray = this.state.polygons.map(polygon => {
      return polygon.coordinates
    })
    console.log(polygonArray)
    const newLat = polygonArray[0].latitude;
    const newLong = polygonArray[0].longitude;

    this.region = {
      latitude: newLat,
      longitude: newLong,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    }

    this.setState({
      latitudeDelta: this.region.latitudeDelta,
      longitudeDelta: this.region.longitudeDelta,
      latitude: this.region.latitude,
      longitude: this.region.longitude
    })
    this.map.animateToRegion(this.region, 100);

  }

  calculateArea = async () => {
    const polygonArray = this.state.polygons.map(polygon => {
      return polygon.coordinates
    })
    for (let i = 0; i < polygonArray.length; i++) {
      const selectedPolygon = polygonArray[i];

      if (!selectedPolygon.length) {
        return 0;
      }
      if (selectedPolygon.length < 3) {
        return 0;
      }
      let radius = 6371000;

      const diameter = radius * 2;
      const circumference = diameter * Math.PI;
      const listY = [];
      const listX = [];
      const listArea = [];

      // calculate segment x and y in degrees for each point

      const latitudeRef = selectedPolygon[0].latitude;
      const longitudeRef = selectedPolygon[0].longitude;
      for (let i = 1; i < selectedPolygon.length; i++) {
        let latitude = selectedPolygon[i].latitude;
        let longitude = selectedPolygon[i].longitude;
        listY.push(this.calculateYSegment(latitudeRef, latitude, circumference));

        listX.push(this.calculateXSegment(longitudeRef, longitude, latitude, circumference));
      }

      // calculate areas for each triangle segment
      for (let i = 1; i < listX.length; i++) {
        let x1 = listX[i - 1];
        let y1 = listY[i - 1];
        let x2 = listX[i];
        let y2 = listY[i];
        listArea.push(this.calculateAreaInSquareMeters(x1, x2, y1, y2));
      }

      // sum areas of all triangle segments
      let areasSum = 0;
      listArea.forEach(area => areasSum = areasSum + area)

      // get abolute value of area, it can't be negative rounded to two decimal places
      let areaCalc = Math.round(Math.abs(areasSum) * 100) / 100;

      this.setState({
        newArea: areaCalc,
        areaTotal: true
      });
      this.addAreaToArray();
    }
  }

  addAreaToArray = () => {
    this.setState(state => {
      const areas = state.areas.concat(state.newArea);
      return {
        areas,
        newArea: ''
      };
    }, () => {
      helperFunctions.saveArrayData('areas', this.state.areas);
      helperFunctions.saveData('address', this.state.destination);
    });
  }

  calculateAreaInSquareMeters = (x1, x2, y1, y2) => {
    return (y1 * x2 - x1 * y2) / 2;
  }

  calculateYSegment = (latitudeRef, latitude, circumference) => {
    return (latitude - latitudeRef) * circumference / 360.0;
  }

  calculateXSegment = (longitudeRef, longitude, latitude, circumference) => {
    return (longitude - longitudeRef) * circumference * Math.cos((latitude * (Math.PI / 180))) / 360.0;
  }

  onPress = (e) => {
    const { editing, creatingPolygon } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingPolygon) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++,
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }

  changeCoordinate = (e, index) => {
    let newCoord = e.nativeEvent.coordinate;
    let newEditing = Object.assign({}, this.state.editing);
    let newCoordinates = Object.assign({}, newEditing.coordinates);
    newCoordinates[index] = newCoord;
    newEditing.coordinates = newCoordinates;
    let transformedCoords = Object.keys(newEditing.coordinates).map(function (key) {
      return newEditing.coordinates[key];
    });
    newEditing.coordinates = transformedCoords;
    this.setState({
      editing: newEditing
    })
  };

  togglePostCard = () => {
    this.setState({
      showCard: false,
      showCardTwo: false,
      showCardThree: false,
      canEdit: true
    });
  }

  onPressZoomIn() {
    this.region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: this.state.latitudeDelta / 2,
      longitudeDelta: this.state.longitudeDelta / 2
    }

    this.setState({
      latitudeDelta: this.region.latitudeDelta,
      longitudeDelta: this.region.longitudeDelta,
      latitude: this.region.latitude,
      longitude: this.region.longitude
    })
    this.map.animateToRegion(this.region, 100);
  }

  onPressZoomOut() {
    this.region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: this.state.latitudeDelta * 2,
      longitudeDelta: this.state.longitudeDelta * 2
    }

    this.setState({
      latitudeDelta: this.region.latitudeDelta,
      longitudeDelta: this.region.longitudeDelta,
      latitude: this.region.latitude,
      longitude: this.region.longitude
    })
    this.map.animateToRegion(this.region, 100);
  }

  render() {
    const predictions = this.state.predictions.map(
      prediction => (
        <TouchableHighlight
          key={prediction.id}
          onPress={() => this.selectedPrediction(prediction)}
        >
          <Text style={customStyles.suggestions}>
            {prediction.description}
          </Text>
        </TouchableHighlight>
      ));

    const allAreas = this.state.areas.map(
      areas => (
        <Text key={areas} style={customStyles.dropdownAreaStyle}>{areas} m2</Text>
      )
    );

    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
    }

    return (
      <View style={customStyles.container}>
        {this.state.showCard && (
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.togglePostCard()}>
                  <Text style={styles.closeButtonStyle}>Skip</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Watch tutorial video:</Text>
              <TouchableOpacity success onPress={this.goToTutorial}>
                <Icon active type="Entypo" name="video" style={styles.videoButtonStyle} />
              </TouchableOpacity>
            </CardItem>
            <CardItem header>
              <Text style={styles.cardTextStyle}>SEE will use Google Maps to find your house.</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>By default the aspect facing you will be South.</Text>
            </CardItem>
            <CardItem>
              <Left></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.setState({
                  showCard: false,
                  showCardTwo: true
                })}>
                  <Icon active type="AntDesign" name="arrowright" style={styles.closeButtonStyle} />
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        )}
        {this.state.showCardTwo && (
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.togglePostCard()}>
                  <Text style={styles.closeButtonStyle}>Skip</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Watch tutorial video:</Text>
              <TouchableOpacity success onPress={this.goToTutorial}>
                <Icon active type="Entypo" name="video" style={styles.videoButtonStyle} />
              </TouchableOpacity>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Tap on screen to place first marker.</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Move clockwise, tapping the screen to add next marker.</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Press and hold marker to move it.</Text>
            </CardItem>
            <CardItem>
              <Left><TouchableOpacity success onPress={() => this.setState({
                showCard: true,
                showCardTwo: false
              })}>
                <Icon active type="AntDesign" name="arrowleft" style={styles.closeButtonStyle} />
              </TouchableOpacity></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.setState({
                  showCard: false,
                  showCardTwo: false,
                  showCardThree: true
                })}>
                  <Icon active type="AntDesign" name="arrowright" style={styles.closeButtonStyle} />
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        )}
        {this.state.showCardThree && (
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.togglePostCard()}>
                  <Text style={styles.closeButtonStyle}>Skip</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Watch tutorial video:</Text>
              <TouchableOpacity success onPress={this.goToTutorial}>
                <Icon active type="Entypo" name="video" style={styles.videoButtonStyle} />
              </TouchableOpacity>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Do not mark area that contains obstacles (velux windows, chimney, vents).</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>Delete will remove all markers.</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.cardTextStyle}>To measure for more than one set of panels click 'Mark another area'.</Text>
            </CardItem>
            <CardItem>
              <Left><TouchableOpacity success onPress={() => this.setState({
                showCard: false,
                showCardTwo: true,
                showCardThree: false
              })}>
                <Icon active type="AntDesign" name="arrowleft" style={styles.closeButtonStyle} />
              </TouchableOpacity></Left>
              <Body></Body>
              <Right>
                <TouchableOpacity success onPress={() => this.togglePostCard()}>
                  <Icon active type="AntDesign" name="arrowright" style={styles.closeButtonStyle} />
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        )}
        {!this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && (
          <MapView
            style={customStyles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta
            }}
            zoomEnabled={true}
            mapType='satellite'
            onPress={e => this.onPress(e)}
            {...mapOptions}
            ref={ref => this.map = ref}
          >
            {this.state.polygons.map(polygon => (
              <Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={2}
              />
            ))}
            {this.state.editing && (
              <Polygon
                key={this.state.editing.coordinates}
                coordinates={this.state.editing.coordinates}
                holes={this.state.editing.holes}
                strokeColor="#000"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={2}
              />
            )}
            {this.state.editing && this.state.editing.coordinates &&
              (this.state.editing.coordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  anchor={{ x: 0.5, y: 0.5 }}
                  onDragEnd={(e) => this.changeCoordinate(e, index)}
                  image={require('../assets/images/mapPointer.png')}
                  draggable
                />
              )))}
          </MapView>
        )}
        {!this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && (
          <TextInput
            placeholder="Please enter Eircode here"
            style={customStyles.textInput}
            placeholderTextColor='#4160A1'
            value={this.state.destination}
            onChangeText={destination => {
              this.setState({ destination });
              this.onChangeDestinationDebounced(destination);
            }}
            value={this.state.destination}
          />
        )}
        {predictions}
        {!this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && this.state.predictionSelected && (
          <View style={customStyles.zoomButtonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={() => { this.onPressZoomIn() }}
            >
              <Feather name="zoom-in" style={customStyles.zoomButtons} size={40} />
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TouchableOpacity
              style={customStyles.button}
              onPress={() => { this.onPressZoomOut() }}
            >
              <Feather name="zoom-out" style={customStyles.zoomButtons} size={40} />
            </TouchableOpacity>
          </View>
        )}
        <View style={customStyles.buttonContainer}>
          {!this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && (
            <TouchableOpacity
              onPress={this.goToGetStarted}
              style={customStyles.button}
            >
              <Ionicons name='md-arrow-round-back' size={40} color={'#4160A1'} />
            </TouchableOpacity>
          )}
          {this.state.editing && this.state.canEdit && !this.state.isSecondArea && (
            <TouchableOpacity
              onPress={() => this.markAnotherArea()}
              style={customStyles.button}
            >
              <Text style={customStyles.textStyle}>Mark another area</Text>
            </TouchableOpacity>
          )}
          {this.state.editing && this.state.canEdit && (
            <TouchableOpacity
              onPress={() => this.finishEditingPolygon()}
              style={customStyles.button}
            >
              <Text style={customStyles.textStyle}>Finished</Text>
            </TouchableOpacity>
          )}
          {this.state.editing === null && !this.state.canEdit && !this.state.areaTotal && !this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && (
            <TouchableOpacity
              onPress={() => this.calculateArea()}
              style={customStyles.button}
            >
              <Text style={customStyles.textStyle}>Calculate Area</Text>
            </TouchableOpacity>
          )}
          {this.state.areaTotal && (
            <TouchableOpacity
              onPress={this.goToPitchMenu}
              style={customStyles.button}
            >
              <Text style={customStyles.textStyle}>Next Step</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={customStyles.deleteButton}>
          {!this.state.areaTotal && !this.state.showCard && !this.state.showCardTwo && !this.state.showCardThree && this.state.editing && this.state.canEdit && (
            <TouchableOpacity
              onPress={() => this.deletePolygon()}
              style={customStyles.button}
            >
              <AntDesign name='delete' size={40} color={'red'} />
            </TouchableOpacity>
          )}
        </View>
        {this.state.areaTotal && (
          <Text style={customStyles.areaTextStyle}>Total Area:</Text>
        )}
        {allAreas}
      </View>
    );
  }
}

MeasurementTool.propTypes = {
  provider: ProviderPropType,
};

export default withFirebaseHOC(MeasurementTool)