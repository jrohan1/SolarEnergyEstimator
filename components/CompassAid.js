import React from 'react'
import { Image } from 'react-native-elements'

const CompassAid = () => (
  <Image
    source={require('../assets/images/compassMap.png')}
    style={{ 
      alignSelf: 'center',
      width: 150,
      height: 150
    }}
  />
)

export default CompassAid