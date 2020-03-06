import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import InputMeasurements from '../screens/InputMeasurements';
import PitchFinder from '../screens/PitchFinder';
import PitchMenu from '../screens/PitchMenu';
import ManualPitchEntry from '../screens/ManualPitchEntry';
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
import InfoPage from '../screens/InfoPage';
import MapTutorial from '../screens/MapTutorial';

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    InputMeasurements: { screen: InputMeasurements},
    PitchFinder: { screen: PitchFinder },
    PitchMenu: {screen: PitchMenu },
    ManualPitchEntry: { screen: ManualPitchEntry },
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
    InfoPage: { screen: InfoPage },
    MapTutorial: { screen: MapTutorial}
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

export default AuthNavigation
