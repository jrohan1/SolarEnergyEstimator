import React, { Component } from 'react';
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TextInput, Dimensions, Keyboard, TouchableHighlight, TouchableOpacity } from "react-native";
import MapView, { Marker, Polygon, ProviderPropType } from 'react-native-maps';
import { styles } from '../stylesheets/MeasurementToolStyles';
import config from '../config';
import _ from 'lodash';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0009;
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
      creatingPolygon: false,
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      300
    );
  };

  componentDidMount() {
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

  goToAreaCalculator = () => this.props.navigation.navigate('AreaCalculator')

  async onChangeDestination(destination) {
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

  selectedPrediction(prediction) {
    Keyboard.dismiss();
    this.setState({
      predictions: [],
      destination: prediction.description
    });
    Keyboard;
    this.handleSubmit(this.state.destination);
  }

  handleSubmit(textInput) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destination.split(' ').join('+')}+ireland&key=${config.GOOGLE_PLACES_API_KEY}`)
      .then(response => this.updateLocationCoordinates(response))
      .catch(error => console.log("Failjax: ", error))
  }

  updateLocationCoordinates(response) {
    var info = response.data.results[0].geometry.location
    this.setState({
      latitude: info.lat,
      longitude: info.lng,
      latitudeDelta: LONGITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA
    })
  }

  finishEditingPolygon() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingPolygon: false,
    });
  }

  deletePolygon() {
   
  }

  // createPolygon() {
  //   const { editing, creatingPolygon } = this.state;
  //   if (!creatingPolygon) {
  //     this.setState({
  //       creatingPolygon: true,
  //       editing: {
  //         ...editing,
  //         holes: [...editing.holes, []],
  //       },
  //     });
  //   } else {
  //     const holes = [...editing.holes];
  //     if (holes[holes.length - 1].length === 0) {
  //       holes.pop();
  //       this.setState({
  //         editing: {
  //           ...editing,
  //           holes,
  //         },
  //       });
  //     }
  //     this.setState({ creatingPolygon: false });
  //   }
  // }

  onPress(e) {
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

      const mapOptions = {
        scrollEnabled: true,
      };
  
      if (this.state.editing) {
        mapOptions.scrollEnabled = false;
        mapOptions.onPanDrag = e => this.onPress(e);
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
          <Marker coordinate={this.state}/>
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
              key={this.state.editing.id}
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
            image={require('../assets/mapPointer.png')}>
           </Marker>
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
          {/* {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createPolygon()}
              style={[styles.bubble]}
            >
              <Text>
                {this.state.creatingPolygon ? 'Finished marking' : 'Mark area to measure'}
              </Text>
            </TouchableOpacity>
          )} */}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finishEditingPolygon()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Finished Editing</Text>
            </TouchableOpacity>
          )}{this.state.editing && (
            <TouchableOpacity
              onPress={() => this.deletePolygon()}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
              onPress={this.goToAreaCalculator}
              style={styles.button}
            >
              <Ionicons name='md-arrow-round-back' size={40} color={'#4160A1'}/>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MeasurementTool.propTypes = {
  provider: ProviderPropType,
};

export default withFirebaseHOC(MeasurementTool)