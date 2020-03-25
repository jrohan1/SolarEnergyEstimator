import React from 'react'
import { Image } from 'react-native-elements'

const AppLogo = () => (
  <Image
    source={require('../assets/images/logo.jpg')}
    style={{ width: 400, height: 250 }}
  />
)

export default AppLogo
