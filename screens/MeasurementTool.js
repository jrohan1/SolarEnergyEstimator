import React, { Component } from 'react';
import { withFirebaseHOC } from '../config/Firebase'
import { Text, View, TextInput, Dimensions, Keyboard, TouchableHighlight } from "react-native";
import MapView from 'react-native-maps';
import { styles } from '../stylesheets/MeasurementToolStyles';
import config from '../config';
import _ from 'lodash';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

class MeasurementTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: '',
      predictions: []
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
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destination.split(' ').join('+')}&key=${config.GOOGLE_PLACES_API_KEY}`)
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
        />
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
      </View>
    );
  }
}

export default withFirebaseHOC(MeasurementTool)