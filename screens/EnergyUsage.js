import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import MenuButton from '../components/MenuButton';
import Lightbulb from '../components/Lightbulb';
import helperFunctions from '../sharedFunctions';

class EnergyUsage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      energyConsumption: 0
    };
  }

  goToElectricCar = () => this.props.navigation.navigate('ElectricCar');

  saveState = (value) => {
    this.setState({
      energyConsumption: value
    }, () => {
      helperFunctions.saveData('energyUsage', value);
    });
  }

  checkForEntry = () => {
    if (this.state.energyConsumption === 0) {
      this.setState({
        showError: true
      });
    } else {
      this.goToElectricCar();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ScrollView>
            <TouchableOpacity onPress={this.goToHome}>
              <SmallLogo />
              <MenuButton navigation={this.props.navigation} />
            </TouchableOpacity>
            <Lightbulb />
            <View style={styles.questionStyle}>
              <Text style={styles.textStyle}>What is your annual energy consumption ?</Text>
              <Text style={styles.subTextStyle}>Ireland's national average 4200 kwh</Text>
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={styles.inputStyle}
                placeholder='kw/h'
                placeholderTextColor='#4160A1'
                keyboardType='numeric'
                returnKeyType='done'
                blurOnSubmit
                onChangeText={(energyConsumption) => this.saveState(energyConsumption)}
                value={this.state.energyConsumption ? `${this.state.energyConsumption}` : null}
              />
            </View>
            {this.state.showError && (
              <ErrorMessage errorValue={'*Please input your energy usage'} />
            )}
            <TouchableOpacity onPress={() => this.checkForEntry()}>
              <Text style={styles.nextButton}>Next Step</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default withFirebaseHOC(EnergyUsage)
