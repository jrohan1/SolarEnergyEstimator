import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import createDrawerNavigator from 'react-navigation-drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		Home: {
			screen: Home
		},
		Login: {
			screen: Login
		},
		Signup: {
			screen: Signup
		}
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);