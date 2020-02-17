import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AreaCalculator from '../screens/AreaCalculator';
import PitchFinder from '../screens/PitchFinder';
import AdditionalInfo from '../screens/AdditionalInfo';
import DrawerNavigator from '../navigation/DrawerNavigator';
import MeasurementTool from '../screens/MeasurementTool';
import GetStarted from '../screens/GetStarted';
import Orientation from '../screens/Orientation';
import Shading from '../screens/Shading';
import EnergyUsage from '../screens/EnergyUsage';
import ElectricCar from '../screens/ElectricCar';
import HotWater from '../screens/HotWater';
import TimeOccupied from '../screens/TimeOccupied';
import Report from '../screens/Report';
import ContactUs from '../screens/ContactUs';

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login},
    Signup: { screen: Signup },
    AreaCalculator: { screen: AreaCalculator},
    PitchFinder: { screen: PitchFinder },
    AdditionalInfo: { screen: AdditionalInfo },
    MeasurementTool: { screen: MeasurementTool },
    GetStarted: { screen: GetStarted },
    Orientation: { screen: Orientation },
    Shading: { screen: Shading },
    EnergyUsage: { screen: EnergyUsage },
    ElectricCar: { screen: ElectricCar },
    HotWater: { screen: HotWater },
    TimeOccupied: { screen: TimeOccupied },
    Report: { screen: Report },
    ContactUs: { screen: ContactUs },
    Drawer: { screen: DrawerNavigator }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AuthNavigation
