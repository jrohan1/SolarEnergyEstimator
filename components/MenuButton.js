import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class MenuButton extends React.Component {
  render() {
    return(
      <Ionicons
        name="md-menu"
        color="#DEE48E"
        size={32}
        style={styles.menuIcon}
        onPress={() => this.props.navigation.navigate('DrawerToggle')} 
      />
    )
  }
}

const styles = StyleSheet.create({
	menuIcon: {
		zIndex: 9,
		position: 'absolute',
		top: 40,
		right: 20,
	}
})