import { AsyncStorage } from 'react-native';

const helperFunctions = {

  saveData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString())
    } catch (error) {
      console.error(error)
    }
  },

  saveArrayData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  },

  /*
    formula to calculate solar energy output of a pv panel
    E = A * r * H * PR
    E = Energy (kWh)
    A = Total solar panel Area (m2)
    r = solar panel yield or efficiency(%) 
      can range from 15% to 23% 
      in general efficiency of solar panels falls between the 15 to 18 percent efficiency range
    H = Annual average solar radiation on tilted panels facing south (shadings not included)
     Degree tilt:   Radiation:
          0           934.25
          35          1073.56
          55          1041.57
          65          993.31
          90          790.69
    PR = Performance ratio, coefficient for losses (range between 0.5 and 0.9, default value = 0.75)
      losses are defined as: 
                            Inverter losses (6% to 15 %)
                            Temperature losses (5% to 15%)
                            DC cables losses (1 to 3 %)
                            AC cables losses (1 to 3 %)
                            Shadings  0 % to 40% (depends of site)
                            Losses weak irradiation 3% yo 7%
                            Losses due to dust, snow... (2%)
  
  */

  energyEstimation: (area, orientation, pitch, shading) => {
    let A = area;
    let PR = helperFunctions.performanceRatio(shading);
    let radiation = helperFunctions.radiation(pitch);
    let orientationValue = helperFunctions.orientation(orientation);
    let E = [];
    const r = .18;
    const panelArea = 1.6;

    let H = radiation.map(
      (radiation, index) => {
        return orientationValue[index] * radiation;
      }
    );

    const energy = A.map(
      (areas, index) => {
        E = areas * panelArea * r * H[index] * PR;
        return E;
      }
    );
     
    return energy;
  },

  performanceRatio: (state) => {
    const inverterLosses = .92;
    const temperatureLosses = .92;
    const dcCableLosses = .98;
    const acCableLosses = .98;
    const weakIrradiation = .97;
    const dustSnowLosses = .98;
    const shading = state;
    let value = 1;

    if (shading === 'A lot') value = .6;
    else if (shading === 'Some') value = .8;
    else if (shading === 'A little') value = .9;
    else value = 1;

    const performanceRatio = inverterLosses * temperatureLosses * dcCableLosses * acCableLosses * weakIrradiation * dustSnowLosses * value;

    return performanceRatio;
  },

  radiation: (state) => {
    let value = 0;
    const radiation = state.map(
      (tilt, index) => {
        if (tilt === 0) {
          return value = 934.25
        } else if (tilt > 0 && tilt <= 15) {
          return value = 1022.13
        } else if (tilt > 15 && tilt <= 25) {
          return value = 1057.87
        } else if (tilt > 25 && tilt <= 35) {
          return value = 1073.56
        } else if (tilt > 35 && tilt <= 45) {
          return value = 1068.32
        } else if (tilt > 45 && tilt <= 55) {
          return value = 1041.57
        } else if (tilt > 55 && tilt <= 65) {
          return value = 993.31
        } else if (tilt > 65 && tilt <= 80) {
          return value = 883.49
        } else if (tilt > 80 && tilt <= 90) {
          return value = 790.69
        } else if (tilt === 90) {
          return value = 636.66
        }
      }
    );

    return radiation;
  },

  orientation: (state) => {
    let value = 0;

    const orientation = state.map(
      (orientations, index) => {

        if (orientations === 'South') {
          return value = 1;
        } else if (orientations === 'SouthWest' || orientations === 'SouthEast') {
          return value = .95;
        } else if (orientations === 'West' || orientations === 'East') {
          return value = .8
        }
      }
    );

    return orientation;
  }
}

export default (helperFunctions)