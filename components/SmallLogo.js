import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

class SmallLogo extends React.Component {
  goToHome = () => this.props.navigation.navigate('Home');

  render() {
    return (
      <TouchableOpacity onPress={this.goToHome}>
        <Image
          source={require('../assets/textLessLogo.jpg')}
          style={styles.logoStyle}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  logoStyle: {
    width: 70,
    height: 50,
    zIndex: 9,
    top: 40,
    left: 20
  }
})

export default withNavigation(SmallLogo)
