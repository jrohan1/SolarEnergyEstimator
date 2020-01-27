import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/MainStyles'
import MenuButton from '../components/MenuButton'
import CastingShade from '../components/CastingShade'

class Shading extends Component {
  constructor(props) {
    super(props);
    this.state = {
     shading: '',
     value: 0
    };
  }
  goToEnergyUsage = () => this.props.navigation.navigate('EnergyUsage')

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <ScrollView>
          <CastingShade/>
          <View style={styles.questionStyle}>
            <Text style={styles.textStyle}>Is the selected area under any shade ?</Text>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => this.setState({shading: 'None', value: 1})}>
              <Text style={styles.button}>None</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({shading: 'A little', value: 2})}>
              <Text style={styles.button}>A little</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({shading: 'Some', value: 3})}>
              <Text style={styles.button}>Some</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({shading: 'A lot', value: 4})}>
              <Text style={styles.button}>A lot</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.goToEnergyUsage}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Shading)
