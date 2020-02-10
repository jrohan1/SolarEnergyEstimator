import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/HotWaterStyles';
import MenuButton from '../components/MenuButton';
import BathPic from '../components/Bath';
import helperFunctions from '../sharedFunctions';

class HotWater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yesNo: ''
    };
  }

  goToTimeOccupied = () => this.props.navigation.navigate('TimeOccupied')

  saveState = (value) => {
    this.setState({
      yesNo: value
    }, () => {
      helperFunctions.saveData('hotWater', value);
    });    
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <BathPic />
        <View style={customStyles.questionStyle}>
          <Text style={styles.textStyle}>Do you want to heat domestic hot water ?</Text>
          <Text style={styles.answerTextStyle}>{this.state.yesNo}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => this.saveState('Yes')}>
            <Text style={[styles.button, customStyles.button]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.saveState('No')}>
            <Text style={[styles.button, customStyles.button]}>No</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.goToTimeOccupied}>
          <Text style={styles.nextButton}>Next Step</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(HotWater)
