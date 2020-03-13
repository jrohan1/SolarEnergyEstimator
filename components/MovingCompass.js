import React, { Component } from 'react';
import { Image, Text, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { ScreenOrientation } from 'expo';
import { Magnetometer } from 'expo-sensors';

const {height, width} = Dimensions.get('window');

export default class MovingCompass extends Component {

  constructor() {
    super();
    this.state = {
      magnetometer: '0',
    };
  }

  componentWillMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
  };

  componentDidMount() {
    this.toggle();
  };

  componentWillUnmount() {
    this.unsubscribe();
  };

  toggle = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  };

  subscribe = async () => {
    this.subscription = Magnetometer.addListener((data) => {
      this.setState({ magnetometer: this.angle(data) });
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

  angle = (magnetometer) => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  render() {
    return (
      <Grid >
        <Row style={{ alignItems: 'center' }} size={.9}>
          <Col style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#DEE48E',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>{this.direction(this.degree(this.state.magnetometer))}
            </Text>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }} size={2}>
          <Col style={{ alignItems: 'center' }}>
            <Image source={require("../assets/images/rotatedCompass.png")} style={{
              height: 225,
              width: 225,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              transform: [{ rotate: 360 - this.state.magnetometer + 'deg' }]
            }} />

          </Col>
        </Row>
      </Grid>

    );
  };
}