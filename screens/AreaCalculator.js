import React, { Component } from 'react'
import { Text, View, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import SmallLogo from '../components/SmallLogo'
import MenuButton from '../components/MenuButton'
import Select from '../components/Select'
import { Col, Row, Grid } from "react-native-easy-grid"
import { styles } from '../stylesheets/AreaCalculatorStyles'

class AreaCalculator extends Component {
  goToPitchFinder = () => this.props.navigation.navigate('PitchFinder')
  goToAdditionalInfo = () => this.props.navigation.navigate('AdditionalInfo')

  constructor(props) {
    super(props)

    this.initialState = {
      height: '',
      width: '',
      orientation: '',
      pitch: '',
      totalArea: '',
      orientationOptions: ['S/W', 'N/W', 'S/E']
    }

    this.state = this.initialState
  }

  handleSubmit = () => {
    const { height, width } = this.state

    Keyboard.dismiss()

    if (!parseFloat(height) || !parseFloat(width)) {
      Alert.alert('Input error', 'Please input some positive numeric values.');
      return;
    }

    const totalArea = Math.abs(parseFloat(height) * parseFloat(width))

    resetForm = () => {
      Keyboard.dismiss()
      this.setState(this.initialState)
    }
  }

  render() {
    const { height, width, orientation, pitch, totalArea } = this.state

    return (
      <View style={styles.container}>
        <SmallLogo />
        <MenuButton navigation={this.props.navigation} />
        <KeyboardAvoidingView behavior="padding" style={styles.grid}>
          <Grid>
            <Col>
              <Row>
                <Text style={styles.textStyle} >Height: </Text>
              </Row>
              <Row>
                <Text style={styles.textStyle} >Width: </Text>
              </Row>
              <Row>
                <Text style={styles.textStyle} >Orientation: </Text>
              </Row>
              <Row>
                <Text style={styles.textStyle} >Pitch: </Text>
              </Row>
              <Row>
                <Text style={styles.textStyle} >Total Area: </Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <TextInput
                  style={styles.textInput}
                  placeholder='meters'
                  placeholderTextColor='#DEE48E'
                  keyboardType='numeric'
                  returnKeyType='done'
                  blurOnSubmit
                  onChangeText={text => setState({ height: text })}
                  value={height} />
              </Row>
              <Row>
                <TextInput
                  style={styles.textInput}
                  placeholder='meters'
                  placeholderTextColor='#DEE48E'
                  keyboardType='numeric'
                  returnKeyType='done'
                  blurOnSubmit
                  onChangeText={text => setState({ width: text })}
                  value={width} />
              </Row>
              <Row>
                <TextInput
                  style={styles.textInput}
                  placeholder='select'
                  placeholderTextColor='#DEE48E'
                  keyboardType='numeric'
                  returnKeyType='done'
                  blurOnSubmit
                  onChangeText={text => setState({ orientation: text })}
                  value={orientation} />
                {/* <Select
                  style={styles.textInput}
                  title={'Orientation'}
                  placeholder='Select Orientation'
                  options={this.state.orientationOptions}
                  onChangeText={text => setState({ orientation: text })}
                  value={orientation} /> */}
              </Row>
              <Row>
                <TextInput
                  style={styles.textInput}
                  placeholder='degrees'
                  placeholderTextColor='#DEE48E'
                  keyboardType='numeric'
                  returnKeyType='done'
                  blurOnSubmit
                  onChangeText={text => setState({ pitch: text })}
                  value={pitch} />
              </Row>
              <Row>
                <TextInput
                  style={styles.textInput}
                  placeholder='meters'
                  placeholderTextColor='#DEE48E'
                  keyboardType='numeric'
                  returnKeyType='done'
                  blurOnSubmit
                  onChangeText={text => setState({ totalArea: text })}
                  value={totalArea} />
              </Row>
            </Col>
          </Grid>
          <TouchableOpacity onPress={this.goToAdditionalInfo}>
            <Text style={styles.nextButton}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.subTextStyle}>Need help finding measurements ?</Text>
          <TouchableOpacity onPress={this.goToPitchFinder}>
            <Text style={styles.button}>Pitch Finder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetForm}>
            <Text style={styles.button}>Measurement Tool</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default withFirebaseHOC(AreaCalculator)