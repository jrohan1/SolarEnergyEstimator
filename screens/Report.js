import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { withFirebaseHOC } from '../config/Firebase';
import { Col, Row, Grid } from "react-native-easy-grid"
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/ReportStyles';
import helperFunctions from '../sharedFunctions';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      pitch: [],
      orientation: [],
      shading: '',
      hotWater: '',
      energyUsage: '',
      electricCar: '',
      timeOccupied: ''
    };
  }

  goToContactUs = () => this.props.navigation.navigate('ContactUs')

  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ area: JSON.parse(value) }));
    AsyncStorage.getItem('pitch').then(value => this.setState({ pitch: JSON.parse(value) }));
    AsyncStorage.getItem('orientation').then(value => this.setState({ orientation: JSON.parse(value) }));
    AsyncStorage.getItem('shading').then(value => this.setState({ shading: value }));
    AsyncStorage.getItem('energyUsage').then(value => this.setState({ energyUsage: value }));
    AsyncStorage.getItem('useElectricCar').then(value => this.setState({ electricCar: value }));
    AsyncStorage.getItem('hotWater').then(value => this.setState({ hotWater: value }));
    AsyncStorage.getItem('timeOccupied').then(value => this.setState({ timeOccupied: value }));
  }

  render() {
    const panelArea = 1.6;
    const calculateNumPanels = this.state.area.map(
      areas => {
        const panels = (areas / panelArea).toFixed();
        return panels;
      }
    );
    const energyEstimation = helperFunctions.energyEstimation(calculateNumPanels, this.state.orientation, this.state.pitch, this.state.shading)
    const calcTotalEnergy = energyEstimation.reduce(
      (a, b) => a + b, 0
    );
    let areaText;
    let numPanelsText;
    let energyProductionText;
    let totalText;
    let totalEnergy;
    let allAreas;
    let allPitches;
    let allOrientations;
    let numPanels;
    let energyPerArea;
    let requiresHotWater;
    let requiresElectricCar;
    let requiresBattery;

    if (this.state.area.length > 1) {

      areaText = (
        <Text style={customStyles.textStyle}>Area/s: </Text>
      );

      numPanelsText = (
        <Text style={customStyles.textStyle}>Number of panels per area: </Text>
      );

      energyProductionText = (
        <Text style={customStyles.textStyle}>Energy production for each area: </Text>
      );

      totalText = (
        <Row>
          <Text style={customStyles.textStyle}>Total potential energy production: </Text>
        </Row>
      );

      totalEnergy = (
        <Row>
          <Text style={customStyles.answerStyle}>{calcTotalEnergy.toFixed(0)} kWh</Text>
        </Row>
      )

      allAreas = this.state.area.map(
        (areas, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>({index + 1}) {areas} m2 </Text>
          </Row>
        )
      );

      allPitches = this.state.pitch.map(
        (pitches, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>({index + 1}) {pitches} degrees </Text>
          </Row>
        )
      );

      allOrientations = this.state.orientation.map(
        (orientations, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>({index + 1}) {orientations} </Text>
          </Row>
        )
      );

      numPanels = calculateNumPanels.map(
        (panels, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>A({index + 1}) {panels} panel/s</Text>
          </Row>
        )
      );

      energyPerArea = energyEstimation.map(
        (energy, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>A({index + 1}) {energy.toFixed(0)} kWh</Text>
          </Row>
        )
      );
    } else {
      areaText = (
        <Text style={customStyles.textStyle}>Area: </Text>
      );

      numPanelsText = (
        <Text style={customStyles.textStyle}>Number of panels: </Text>
      );

      energyProductionText = (
        <Text style={customStyles.textStyle}>Potential energy production: </Text>
      );

      allAreas = this.state.area.map(
        (areas, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>{areas} m2 </Text>
          </Row>
        )
      );

      allPitches = this.state.pitch.map(
        (pitches, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>{pitches} degrees </Text>
          </Row>
        )
      );

      allOrientations = this.state.orientation.map(
        (orientations, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>{orientations} </Text>
          </Row>
        )
      );

      numPanels = calculateNumPanels.map(
        (panels, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>{panels} panel/s</Text>
          </Row>
        )
      );

      energyPerArea = energyEstimation.map(
        (energy, index) => (
          <Row key={index}>
            <Text key={index} style={customStyles.answerStyle}>{energy.toFixed(0)} kWh</Text>
          </Row>
        )
      );
    }

    if (this.state.hotWater === 'Yes') {
      requiresHotWater = <Text style={[customStyles.answerStyle, customStyles.addedText]}>*To heat domestic hot water you will need to install a Hot Water Power Diverter.</Text>
    };

    if (this.state.electricCar === 'Yes') {
      requiresElectricCar = <Text style={[customStyles.answerStyle, customStyles.addedText]}>*You may be interested in an eco charging station for your electric car that can be powered by solar PV.</Text>
    }

    if (this.state.timeOccupied === 'Morning' || this.state.timeOccupied === 'Evening') {
      requiresBattery = <Text style={[customStyles.answerStyle, customStyles.addedText]}>*You should consider installing a battery to store energy.</Text>
    }

    const percentageOfUsage = (calcTotalEnergy / this.state.energyUsage) * 100;
    const carbonEmissions = (calcTotalEnergy * 0.291);
    const savings = calcTotalEnergy * 0.162;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Header />
          <View style={customStyles.container}>
            <Text style={customStyles.headerStyle}>The information you provided:</Text>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  {areaText}
                </Row>
              </Col>
              <Col>
                {allAreas}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Pitch: </Text>
                </Row>
              </Col>
              <Col>
                {allPitches}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Orientation: </Text>
                </Row>
              </Col>
              <Col>
                {allOrientations}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Shading: </Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Heat Water: </Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.textStyle}>Annual energy consumption:</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Electric Car: </Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.textStyle}>Time of highest energy usage: </Text>
                </Row>
              </Col>
              <Col>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.shading}</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.hotWater}</Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.answerStyle}>{this.state.energyUsage} kWh</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.electricCar}</Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.answerStyle}>{this.state.timeOccupied}</Text>
                </Row>
              </Col>
            </Grid>
            <Text style={customStyles.subHeaderStyle}>Results: </Text>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  {numPanelsText}
                </Row>
              </Col>
              <Col>
                {numPanels}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  {energyProductionText}
                </Row>
              </Col>
              <Col>
                {energyPerArea}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                {totalText}
                <Row style={{ height: 100 }}>
                  <Text style={customStyles.textStyle}>% of annual energy consumption: </Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.textStyle}>Potential annual savings: </Text>
                </Row>
                <Row style={{ height: 80 }}>
                  <Text style={customStyles.textStyle}>CO2 emissions reduced by: </Text>
                </Row>
              </Col>
              <Col>
                {totalEnergy}
                <Row style={{ height: 100 }}>
                  <Text style={customStyles.answerStyle}>{percentageOfUsage.toFixed(0)} %</Text>
                </Row>
                <Row >
                  <Text style={customStyles.answerStyle}>€{savings.toFixed(0)}</Text>
                </Row>
                <Row>
                  <Text style={customStyles.answerStyle}>{carbonEmissions.toFixed(2)} Kg</Text>
                </Row>
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Row>
                <Text style={[customStyles.answerStyle, customStyles.addedText]}>*Potential savings based on a cost of 16.2c per kWh and the use of battery storage.</Text>
              </Row>
              <Row>{requiresBattery}</Row>
              <Row>{requiresHotWater}</Row>
              <Row>{requiresElectricCar}</Row>
            </Grid>
          </View>
          <TouchableOpacity onPress={this.goToContactUs}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Report)
