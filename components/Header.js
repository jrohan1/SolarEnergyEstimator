import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerTrigger from './DrawerTrigger';
import SmallLogo from './SmallLogo';

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <SmallLogo/>
        <DrawerTrigger/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between'
 }
});

export default Header;