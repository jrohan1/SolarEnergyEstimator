import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login},
    Signup: { screen: Signup }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AuthNavigation
