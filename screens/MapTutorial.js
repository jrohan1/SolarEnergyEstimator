import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { Video } from 'expo-av';
import { Icon } from 'native-base';



class MapTutorial extends Component {


  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
              <Icon active type="FontAwesome" name="close" style={styles.closeButtonStyle} />
            </TouchableOpacity>
          </View>
          <Video
            source={require('../assets/videos/mapTutorial.webm')}
            shouldPlay
            isLooping
            useNativeControls
            resizeMode="contain"
            style={{ width, height: '90%' }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
  },
  closeButtonStyle: {
    flexDirection: 'row-reverse',
    fontSize: 30,
    marginLeft: 10,
  }
});

export default withFirebaseHOC(MapTutorial)
