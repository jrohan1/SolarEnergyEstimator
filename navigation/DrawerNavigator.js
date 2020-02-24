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

const DrawerNavigator =  createDrawerNavigator(
	{
    'Home': Home,
    'Input Measurements': InputMeasurements,
    'Area Measurement Tool': MeasurementTool,
    'Pitch Finder': PitchFinder,
    'Input Pitch': ManualPitchEntry,
    'Orientation': Orientation,
    'Shading': Shading,
    'Electric Car': ElectricCar,
    'Energy Usage': EnergyUsage,
    'Hot Water': HotWater,
    'Time Occupied': TimeOccupied,
    'Report': Report,
    'Contact Us': ContactUs
	}
);

export default DrawerNavigator;