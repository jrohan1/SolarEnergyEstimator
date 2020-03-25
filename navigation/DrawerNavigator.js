import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Home';
import InputMeasurements from '../screens/InputMeasurements';
import PitchFinder from '../screens/PitchFinder';
import ManualPitchEntry from '../screens/ManualPitchEntry';
import MeasurementTool from '../screens/MeasurementTool';
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
import PitchTutorial from '../screens/PitchTutorial';

const DrawerNavigator =  createDrawerNavigator(
	{
    'Home': Home,
    'Area Measurement Tool': MeasurementTool,
    'Pitch Finder': PitchFinder,
    'Input Measurements': InputMeasurements,
    'Input Pitch': ManualPitchEntry,
    'Report': Report,
    'Contact Us': ContactUs,
    "FAQ's": InfoPage,
    'Tutorial for Measurement Tool': MapTutorial,
    'Tutorial for Pitch Finder': PitchTutorial
	}
);

export default DrawerNavigator;