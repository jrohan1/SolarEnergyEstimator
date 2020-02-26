import React from 'react'
import { Image } from 'react-native-elements'

const BathPic = () => (
  <Image
    source={require('../assets/bath.png')}
    style={{ 
      alignSelf: 'center',
      marginTop: 20
    }}
  />
)

export default BathPic