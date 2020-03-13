import React from 'react'
import { Image } from 'react-native-elements'

const Lightbulb = () => (
  <Image
    source={require('../assets/images/lightbulb.png')}
    style={{ alignSelf: 'center',
      width: 300,
      height: 250
    }}
  />
)

export default Lightbulb