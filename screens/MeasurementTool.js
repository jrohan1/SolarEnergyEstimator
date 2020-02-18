import React, { Component } from 'react';
import { withFirebaseHOC } from '../config/Firebase'
import { AsyncStorage, Text, View, TextInput, Dimensions, Keyboard, TouchableHighlight, TouchableOpacity, PermissionsAndroid } from "react-native";
import MapView, { Marker, Polygon, ProviderPropType } from 'react-native-maps';
import { styles } from '../stylesheets/MeasurementToolStyles';
import config from '../config';
import _ from 'lodash';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import helperFunctions from '../sharedFunctions';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0007;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
let id = 0;

class MeasurementTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: '',
      predictions: [],
      polygons: [],
      editing: null,
      canEdit: false,
      creatingPolygon: false,
      initialScreen: true,
      areaTotal: false,
      newArea: '',
      areas: []
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      300
    );
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  goToAreaCalculator = () => this.props.navigation.navigate('AreaCalculator');
  goToPitchMenu = () => this.props.navigation.navigate('PitchMenu');

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
      destination: prediction.description
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
      latitudeDelta: LONGITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA
    })
  }

  createPolygon = () => {
    this.setState({
      initialScreen: false,
      canEdit: true
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
      canEdit: true
    });
  }

  deletePolygon = () => {
    this.setState({
      polygons: [],
      areas: [],
      canEdit: true
    })
  }

  calculateArea = async() => {
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
  }

  render() {
    const predictions = this.state.predictions.map(
      prediction => (
        <TouchableHighlight
          key={prediction.id}
          onPress={() => this.selectedPrediction(prediction)}
        >
          <Text style={styles.suggestions}>
            {prediction.description}
          </Text>
        </TouchableHighlight>
      ));

    const allAreas = this.state.areas.map(
      areas => (
        <Text key={areas} style={styles.dropdownAreaStyle}>{areas} m2</Text>
      )
    );

    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          mapType='satellite'
          onPress={e => this.onPress(e)}
          {...mapOptions}
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
          {this.state.editing && !this.state.initialScreen && (
            <Polygon
              key={this.state.editing.coordinates}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            />
          )}
          {this.state.editing && this.state.editing.coordinates && !this.state.initialScreen &&
            (this.state.editing.coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                anchor={{ x: 0.5, y: 0.5 }}
                onDragEnd={(e) => this.changeCoordinate(e, index)}
                image={require('../assets/mapPointer.png')}
                draggable
              />

            )))}
        </MapView>
        <TextInput
          placeholder="Please enter Eircode here"
          style={styles.textInput}
          placeholderTextColor='#4160A1'
          value={this.state.destination}
          onChangeText={destination => {
            this.setState({ destination });
            this.onChangeDestinationDebounced(destination);
          }}
          value={this.state.destination}
        />
        {predictions}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.goToAreaCalculator}
            style={styles.button}
          >
            <Ionicons name='md-arrow-round-back' size={40} color={'#4160A1'} />
          </TouchableOpacity>
          {this.state.initialScreen && (
            <TouchableOpacity
              onPress={() => this.createPolygon()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Click to Start marking area</Text>
            </TouchableOpacity>
          )}
          {this.state.editing && !this.state.initialScreen && this.state.canEdit && (
            <TouchableOpacity
              onPress={() => this.markAnotherArea()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Mark another area</Text>
            </TouchableOpacity>
          )}
          {this.state.editing && !this.state.initialScreen && this.state.canEdit && (
            <TouchableOpacity
              onPress={() => this.finishEditingPolygon()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Finished</Text>
            </TouchableOpacity>
          )}
          {this.state.editing === null && !this.state.initialScreen && !this.state.canEdit && !this.state.areaTotal && (
            <TouchableOpacity
              onPress={() => this.calculateArea()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Calculate Area</Text>
            </TouchableOpacity>
          )}
          {this.state.editing === null && !this.state.initialScreen && !this.state.canEdit && (
            <TouchableOpacity
              onPress={() => this.deletePolygon()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          )}
          {this.state.areaTotal &&  (
            <TouchableOpacity
              onPress={this.goToPitchMenu}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Next Step</Text>
            </TouchableOpacity>
          )}
        </View>
        {this.state.areaTotal && (
          <Text style={styles.areaTextStyle}>Total Area:</Text>
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