import React from 'react'
import { Image } from 'react-native-elements'

const ElectricCarPic = () => (
  <Image
    source={require('../assets/electricCarPic.png')}
    style={{ alignSelf: 'center',
      width: 350,
      height: 200,
      marginTop: 20
    }}
  />
)

export default ElectricCarPic