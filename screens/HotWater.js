import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/MainStyles'
import { customStyles } from '../stylesheets/HotWaterStyles'
import MenuButton from '../components/MenuButton'
import BathPic from '../components/Bath'
import { ButtonGroup } from 'react-native-elements';

const component1 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>Yes</Text>
</TouchableOpacity>
const component2 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>No</Text>
</TouchableOpacity>

class HotWater extends Component {
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

  goToTimeOccupied = () => this.props.navigation.navigate('TimeOccupied')

  render() {
    const buttons = [{ element: component1 }, { element: component2 }]
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <BathPic />
        <View style={customStyles.questionStyle}>
          <Text style={styles.textStyle}>Do you want to heat domestic hot water ?</Text>
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
        <TouchableOpacity onPress={this.goToTimeOccupied}>
          <Text style={styles.nextButton}>Next Step</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withFirebaseHOC(HotWater)
