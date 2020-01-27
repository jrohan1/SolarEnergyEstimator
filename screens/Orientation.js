import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/MainStyles'
import MenuButton from '../components/MenuButton'
import Compass from '../components/Compass'

class Orientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      orientation: '',
      value: 0
    };
  }
  goToShading = () => this.props.navigation.navigate('Shading');

  setSelected() {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
  }

  changeColor() {
    console.log(this.state.selected)
    return this.state.selected ? styles.pressed : styles.button;
  }

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
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({orientation: 'south', value: 1})}>
              <Text style={styles.button}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation: 'southWest', value: 2})}>
              <Text style={styles.button}>S/W</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation:'southEast', value: 3})}>
              <Text style={styles.button}>S/E</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({orientation:'east', value: 4})}>
              <Text style={styles.button}>E</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({orientation:'west', value: 5})}>
              <Text style={styles.button}>W</Text>
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
