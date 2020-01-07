import React, { Component } from 'react'
import { Text, View, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown'
import { withFirebaseHOC } from '../config/Firebase'
import SmallLogo from '../components/SmallLogo'
import MenuButton from '../components/MenuButton'
import Select from '../components/Select'
import { Col, Row, Grid } from "react-native-easy-grid"
import { styles } from '../stylesheets/AdditionalInfoStyles'
import { Ionicons } from '@expo/vector-icons'

const YES_NO_OPTION = ['Yes', 'No']
const TIME_OPTION = ['Morning', 'Afternoon', 'Evening', 'Night', 'All Day']

class AdditionalInfo extends Component {
  goToPitchFinder = () => this.props.navigation.navigate('PitchFinder')

  constructor(props) {
    super(props)

    this.initialState = {
      shade: '',
      timeOfConsumption: '',
      energyConsumption: '',
      hotWater: '',
      electricCar: '',
      sellEnergy: '',
      timeOptions: ['Morning', 'Afternoon', 'Evening', 'Night'],
      yesNoOption: ['Yes', 'No']
    }

    this.state = this.initialState
  }



  render() {
    const { shade, timeOfConsumption, energyConsumption, hotWater, electricCar, sellEnergy } = this.state

    return (
      <View style={styles.container}>
        <SmallLogo />
        <MenuButton navigation={this.props.navigation} />
        <Grid style={styles.grid}>
          <Col size={2}>
            <Row>
              <Text style={styles.textStyle} >Percentage of roof under shade: </Text>
            </Row>
            <Row>
              <Text style={styles.textStyle} >Time of day when most energy is consumed: </Text>
            </Row>
            <Row>
              <Text style={styles.textStyle} >Average annual energy consumption: </Text>
            </Row>
            <Row>
              <Text style={styles.textStyle} >Do you have/plan to have an electric car ? </Text>
            </Row>
            <Row>
              <Text style={styles.textStyle} >Do you want to heat domestic hot water ? </Text>
            </Row>
            <Row>
              <Text style={styles.textStyle} >Are you interested in selling excess energy to the grid ? </Text>
            </Row>
          </Col>
          <Col>
            <Row>
              <TextInput
                style={styles.textInput}
                placeholder='%'
                placeholderTextColor='#DEE48E'
                keyboardType='numeric'
                returnKeyType='done'
                blurOnSubmit
                onChangeText={text => setState({ shade: text })}
                value={shade} />
            </Row>
            <Row>
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.largeDropdown}
                dropdownTextStyle={styles.dropdownListText}
                defaultValue={'Select'}
                options={TIME_OPTION}
              />
            </Row>
            <Row>
              <TextInput
                style={styles.textInput}
                placeholder='kw/h'
                placeholderTextColor='#DEE48E'
                keyboardType='numeric'
                returnKeyType='done'
                blurOnSubmit
                onChangeText={text => setState({ energyConsumption: text })}
                value={energyConsumption} />
            </Row>
            <Row>
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownListText}
                defaultValue={'Select'}
                options={YES_NO_OPTION}
              />
            </Row>
            <Row>
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownListText}
                defaultValue={'Select'}
                options={YES_NO_OPTION}
              />
            </Row>
            <Row>
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownListText}
                defaultValue={'Select'}
                options={YES_NO_OPTION}
              />
            </Row>
          </Col>
        </Grid>
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(AdditionalInfo)