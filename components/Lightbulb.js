import React from 'react'
import { Image } from 'react-native-elements'

const Lightbulb = () => (
  <Image
    source={require('../assets/lightbulb.png')}
    style={{ alignSelf: 'center',
      width: 300,
      height: 250,
      marginTop: 70
    }}
  />
)

export default Lightbulb