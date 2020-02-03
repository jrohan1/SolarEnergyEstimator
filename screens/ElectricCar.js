import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/ElecricCarStyles';
import MenuButton from '../components/MenuButton';
import ElectricCarPic from '../components/ElectricCar';
import { ButtonGroup } from 'react-native-elements';

class ElectricCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yesNo: '',
      value: 0
    };
  }

  goToHotWater = () => this.props.navigation.navigate('HotWater')

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <ElectricCarPic />
        <View style={styles.questionStyle}>
          <Text style={styles.textStyle}>Do you have / plan to have an electric car ?</Text>
          <Text style={styles.answerTextStyle}>{this.state.yesNo}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => this.setState({ yesNo: 'Yes', value: 1 })}>
            <Text style={[styles.button, customStyles.button]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ yesNo: 'No', value: 2 })}>
            <Text style={[styles.button, customStyles.button]}>No</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.goToHotWater}>
          <Text style={styles.nextButton}>Next Step</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(ElectricCar)
