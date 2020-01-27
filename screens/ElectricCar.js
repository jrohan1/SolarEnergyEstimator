import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/MainStyles'
import MenuButton from '../components/MenuButton'
import ElectricCarPic from '../components/ElectricCar'
import { ButtonGroup } from 'react-native-elements';

const component1 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>Yes</Text>
</TouchableOpacity>
const component2 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>No</Text>
</TouchableOpacity>

class ElectricCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  goToHotWater = () => this.props.navigation.navigate('HotWater')

  render() {
    const buttons = [{ element: component1 }, { element: component2 }]
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <ElectricCarPic />
        <View style={styles.questionStyle}>
          <Text style={styles.textStyle}>Do you have / plan to have an electric car ?</Text>
        </View>
        <View style={styles.groupButton}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonContainerStyle}
            selectedButtonStyle={styles.selectedButtonStyle}
          />
        </View>
        <TouchableOpacity onPress={this.goToHotWater}>
          <Text style={styles.nextButton}>Next Step</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(ElectricCar)
