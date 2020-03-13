import React from 'react'
import { Image } from 'react-native-elements'

const Compass = () => (
  <Image
    source={require('../assets/images/compass.png')}
    style={{ 
      marginTop: 20,
      alignSelf: 'center',
      width: 200,
      height: 200
    }}
  />
)

export default Compass