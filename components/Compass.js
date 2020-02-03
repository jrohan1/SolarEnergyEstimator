import React from 'react'
import { Image } from 'react-native-elements'

const Compass = () => (
  <Image
    source={require('../assets/compass.png')}
    style={{ alignSelf: 'center',
      width: 200,
      height: 200,
      marginTop: 60
    }}
  />
)

export default Compass