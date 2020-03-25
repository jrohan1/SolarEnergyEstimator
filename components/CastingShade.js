import React from 'react'
import { Image } from 'react-native-elements'

const CastingShade = () => (
  <Image
    source={require('../assets/images/shading.png')}
    style={{ alignSelf: 'center',
      width: 300,
      height: 250,
      marginTop: 20
    }}
  />
)

export default CastingShade