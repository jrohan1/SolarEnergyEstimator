import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import DrawerNavigator from './DrawerNavigator';

const AppNavigation = createAppContainer(
  createSwitchNavigator(
    {
      Main: DrawerNavigator
    }
  )
);

export default AppNavigation
