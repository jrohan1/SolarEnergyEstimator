import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

class DrawerTrigger extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
      }}>
        <Ionicons
          name="md-menu"
          color="#DEE48E"
          size={40}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    top: 40,
    right: 20,
    height: 90,
    width: 40,
  }
});

export default withNavigation(DrawerTrigger);