import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginLeft: 25
  },
  errorText: {
    fontSize: 17,
    color: '#FF8C00',
    //textShadowColor:'white',
    //textShadowRadius: 80,
  }
})

export default ErrorMessage
