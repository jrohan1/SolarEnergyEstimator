import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  autoCompleteType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor='#DEE48E'
      inputStyle={{color:'#DEE48E'}}
      name={name}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCompleteType={autoCompleteType}
      selectionColor='#DEE48E'
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    margin: 5
  },
  iconStyle: {
    marginRight: 10
  }
})

export default FormInput
