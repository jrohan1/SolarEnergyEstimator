import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import AreaCalculator from '../screens/AreaCalculator'
import DrawerNavigator from '../navigation/DrawerNavigator'

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login},
    Signup: { screen: Signup },
    AreaCalculator: { screen: AreaCalculator},
    Drawer: { screen: DrawerNavigator }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AuthNavigation
