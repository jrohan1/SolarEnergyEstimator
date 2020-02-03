import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/OrientationStyle';
import MenuButton from '../components/MenuButton';
import Compass from '../components/Compass';

class Orientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      value: 0
    };
  }
  goToShading = () => this.props.navigation.navigate('Shading');

  render() {
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
            <Text style={styles.answerTextStyle}>{this.state.orientation}</Text>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({orientation: 'South', value: 1})}>
              <Text style={[styles.button, customStyles.button]}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation: 'SouthWest', value: 2})}>
              <Text style={[styles.button, customStyles.button]}>S/W</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation:'SouthEast', value: 3})}>
              <Text style={[styles.button, customStyles.button]}>S/E</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => this.setState({orientation:'East', value: 4})}>
              <Text style={[styles.button, customStyles.button]}>E</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation:'West', value: 5})}>
              <Text style={[styles.button, customStyles.button]}>W</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.goToShading}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Orientation)