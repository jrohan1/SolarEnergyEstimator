import React, { Component } from 'react';
import { AsyncStorage, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { Col, Row, Grid } from "react-native-easy-grid"
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/ReportStyles';
import MenuButton from '../components/MenuButton';
import helperFunctions from '../sharedFunctions';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      pitch: '',
      orientation: '',
      shading: '',
      hotWater: '',
      energyUsage: '',
      electricCar: '',
      timeOccupied: '',
      numPanels: []
    };
  }

  goToHotWater = () => this.props.navigation.navigate('HotWater')

  componentWillMount = () => {
    this.importData();
  }

  importData = () => {
    AsyncStorage.getItem('areas').then(value => this.setState({ area: JSON.parse(value) }));
    AsyncStorage.getItem('pitch').then(value => this.setState({ pitch: value }));
    AsyncStorage.getItem('orientation').then(value => this.setState({ orientation: value }));
    AsyncStorage.getItem('shading').then(value => this.setState({ shading: value }));
    AsyncStorage.getItem('energyUsage').then(value => this.setState({ energyUsage: value }));
    AsyncStorage.getItem('useElectricCar').then(value => this.setState({ electricCar: value }));
    AsyncStorage.getItem('hotWater').then(value => this.setState({ hotWater: value }));
    AsyncStorage.getItem('timeOccupied').then(value => this.setState({ timeOccupied: value }));
  }

  render() {
    const panelArea = 1.7922;

    const allAreas = this.state.area.map(
      (areas, index) => (
        <Row key={index}>
          <Text key={index} style={customStyles.answerStyle}>({index + 1}) {areas}m2 </Text>
        </Row>
      )
    );

    const calculateNumPanels = this.state.area.map(
      areas => {
        const panels = (areas / panelArea).toFixed();
        return panels;
      }
    )

    const numPanels = calculateNumPanels.map(
      (panels, index) => (
        <Row key={index}>
          <Text key={index} style={customStyles.answerStyle}>Area {index + 1}: {panels} panel/s</Text>
        </Row>
      )
    );

    const energyEstimation = helperFunctions.energyEstimation(calculateNumPanels, this.state.orientation, this.state.pitch, this.state.shading)

    const energyPerArea = energyEstimation.map(
      (energy, index) => (
        <Row key={index}>
          <Text key={index} style={customStyles.answerStyle}>Area {index + 1}: {energy.toFixed(2)} kw/hrs</Text>
        </Row>
      )
    );

    const totalEnergy = energyEstimation.reduce(
      (a, b) => a + b, 0
    );

    const percentageOfUsage = (totalEnergy/this.state.energyUsage)*100;

    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={this.goToHome}>
            <SmallLogo />
            <MenuButton navigation={this.props.navigation} />
          </TouchableOpacity>
          <View style={customStyles.container}>
            <Text style={customStyles.headerStyle}>The information you provided:</Text>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Area/s: </Text>
                </Row>
              </Col>
              <Col>
                {allAreas}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Pitch: </Text>
                </Row>
                <Row>
                  <Text style={customStyles.textStyle}>Orientation: </Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Shading: </Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Heat Water: </Text>
                </Row>
                <Row style={{ height: 60 }}>
                  <Text style={customStyles.textStyle}>Annual energy consumption:</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.textStyle}>Electric Car: </Text>
                </Row>
                <Row style={{ height: 60 }}>
                  <Text style={customStyles.textStyle}>Time of highest energy usage: </Text>
                </Row>
              </Col>
              <Col>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.pitch} degrees </Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.orientation}</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.shading}</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.hotWater}</Text>
                </Row>
                <Row style={{ height: 60 }}>
                  <Text style={customStyles.answerStyle}>{this.state.energyUsage} kw/hrs</Text>
                </Row>
                <Row style={customStyles.rowStyle}>
                  <Text style={customStyles.answerStyle}>{this.state.electricCar}</Text>
                </Row>
                <Row style={{ height: 60 }}>
                  <Text style={customStyles.answerStyle}>{this.state.timeOccupied}</Text>
                </Row>
              </Col>
            </Grid>
            <Text style={customStyles.subHeaderStyle}>Results: </Text>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Number of panels per area: </Text>
                </Row>
              </Col>
              <Col>
                {numPanels}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Energy production for each set of panels: </Text>
                </Row>
              </Col>
              <Col>
                {energyPerArea}
              </Col>
            </Grid>
            <Grid style={customStyles.gridStyle}>
              <Col>
                <Row>
                  <Text style={customStyles.textStyle}>Total potential energy production: </Text>
                </Row>
                <Row>
                  <Text style={customStyles.textStyle}>Percentage of energy usage: </Text>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Text style={customStyles.answerStyle}>{totalEnergy.toFixed(2)} kw/hrs</Text>
                </Row>
                <Row>
                  <Text style={customStyles.answerStyle}>{percentageOfUsage.toFixed(2)} %</Text>
                </Row>
              </Col>
            </Grid>
          </View>
          <TouchableOpacity onPress={this.addAreaToArray}>
            <Text style={styles.nextButton}>Next Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(Report)
