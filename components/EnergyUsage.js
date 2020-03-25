import React from 'react'
import { Image } from 'react-native-elements'

const EnergyUsage = () => (
  <Image
    source={require('../assets/images/houseWork.png')}
    style={{ 
      alignSelf: 'center',
      marginBottom: 15
    }}
  />
)

export default EnergyUsage