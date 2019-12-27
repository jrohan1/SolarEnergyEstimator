import React from 'react'
import { Image } from 'react-native-elements'

const AppLogo = () => (
  <Image
    source={require('../assets/logo.jpg')}
    style={{ width: 400, height: 350 }}
  />
)

export default AppLogo
