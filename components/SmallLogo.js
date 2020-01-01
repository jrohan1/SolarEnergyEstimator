import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'

const SmallLogo = () => (
  <Image
    source={require('../assets/textLessLogo.jpg')}
    style={styles.logoStyle}
  />
)

const styles = StyleSheet.create({
  logoStyle: {
    width: 70,
    height: 50,
    position: 'absolute',
    zIndex: 9,
    top: 40,
    left: 20 
  }
})

export default SmallLogo
