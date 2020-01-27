import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import { withFirebaseHOC } from '../config/Firebase'
import { styles } from '../stylesheets/MainStyles'
import { customStyles } from '../stylesheets/HotWaterStyles'
import MenuButton from '../components/MenuButton'
import EnergyUse from '../components/EnergyUsage'
import { ButtonGroup } from 'react-native-elements';

const component1 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>Morning</Text>
</TouchableOpacity>
const component2 = () => <TouchableOpacity>
  <Text style={styles.groupButtonText}>Afternoon</Text>
</TouchableOpacity>
const component3 = () => <TouchableOpacity>
<Text style={styles.groupButtonText}>Evening</Text>
</TouchableOpacity>
const component4 = () => <TouchableOpacity>
<Text style={styles.groupButtonText}>All Day</Text>
</TouchableOpacity>

class TimeOccupied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 5
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  goToTimeOccupied = () => this.props.navigation.navigate('TimeOccupied')

  render() {
    const buttons = [{ element: component1 }, { element: component2 }]
    const buttons1 = [{ element: component3 }, { element: component4 }]
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <EnergyUse/>
        <View style={customStyles.questionStyle}>
          <Text style={styles.textStyle}>Select time of day when most energy is consumed</Text>
        </View>
        <View style={styles.groupButton}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonContainerStyle}
            selectedButtonStyle={styles.selectedButtonStyle}
          />
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons1}
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

export default withFirebaseHOC(TimeOccupied)
