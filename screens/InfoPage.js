import React, { Component } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/InfoStyles';
import Header from '../components/Header';


class InfoPage extends Component {
  state = {
    result: null,
  };

  openSeaiWebBrowser = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.seai.ie/grants/home-energy-grants/solar-electricity-grant/');
    this.setState({ result });
  };

  openPvgisWebBrowser = async () => {
    let result = await WebBrowser.openBrowserAsync('https://ec.europa.eu/jrc/en/pvgis');
    this.setState({ result });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header />
          <View style={styles.blockStyle}>
            <Text style={styles.questionStyle}>What is Solar PV ? </Text>
            <Text style={styles.answerStyle}>   Solar panels which produce electricity are referred to as ‘solar photovoltaic (PV) modules.’</Text>
            <Text style={styles.answerStyle}>   These are panels made from materials which generate DC electricity when exposed to light.</Text>
            <Text style={styles.questionStyle}>Is Ireland's climate suitable for solar panels ?</Text>
            <Text style={styles.answerStyle}>   Yes, solar PV systems will perform at there best in direct sunlight but will still generate electricity when there is daylight, so they will still function on
overcast days in Ireland.</Text>
            <Text style={styles.answerStyle}>   Ireland fairs better than some other sunnier European countries when it comes to daylight hours through out the year.</Text>
            <Text style={styles.questionStyle}>Can I heat my water with solar PV ?</Text>
            <Text style={styles.answerStyle}>   Yes, water can be heated by adding a Hot Water Divert to heat your cylinder with excess electricity.</Text>
            <Text style={styles.questionStyle}>How much do solar panels cost?</Text>
            <Text style={styles.answerStyle}>   The cost of a solar PV system depends on a range of factors including the hardware chosen, size of
system, accessibility of the roof or site, and the installer used. Broadly speaking home PV systems
should range from around €1,500 - €2,000 per kW installed (ex-VAT), but prices will vary depending
on the factors mentioned above.</Text>
            <Text style={styles.questionStyle}>Does the age of the house matter ?</Text>
            <Text style={styles.answerStyle}>   For the purposes of availing of the government grant the house needs to be built and occupied before Janruary 2011.</Text>
            <Text style={styles.questionStyle}>Will it matter if I have tiles or slates on my roof ?</Text>
            <Text style={styles.answerStyle}>   There will be a difference in price for installation on a slate, tile or standing seam roof, but panels can be fitted to all of them.</Text>
            <Text style={styles.questionStyle}>Is there a way to store energy ?</Text>
            <Text style={styles.answerStyle}>   Yes, by adding a battery to your solar PV system, the battery will charge when the PV system is generating electricity
which isn’t being used, and then discharge when you need it next (normally that evening/night).</Text>
            <Text style={styles.questionStyle}>Can I sell energy back to the grid ?</Text>
            <Text style={styles.answerStyle}>   There is currently no obligation for energy suppliers to pay customers for the electricity they generate with their solar panels.</Text>
            <Text style={styles.questionStyle}>What is an invertor, why do I need it ?</Text>
            <Text style={styles.answerStyle}>   Invertors convert DC electricity that comes from the solar panels to AC electricity that is used in our homes.</Text>
            <Text style={styles.answerStyle}>   Without the invertor we can not use the electricity generated by the solar panels.</Text>
            <Text style={styles.questionStyle}>Are there grants available ?</Text>
            <Text style={styles.answerStyle}>   Yes, there are grants available for home owners to install solar pv panels and a storage battery.</Text>
            <Text style={styles.answerStyle}>   For the most uptodate information on grants please visit .</Text>
            <TouchableOpacity onPress={this.openSeaiWebBrowser}>
              <Text style={[styles.answerStyle, styles.link]}> www.seai.ie</Text>
            </TouchableOpacity>
            <Text style={styles.questionStyle}>Other useful links:</Text>
            <Text style={styles.answerStyle}>PVGIS is an online free solar photovoltaic energy calculator. Use it to check solar pv performance and solar radiation levels, for each month, in any location around the world.</Text>
            <TouchableOpacity onPress={this.openPvgisWebBrowser}>
              <Text style={[styles.answerStyle, styles.link]}> www.pvgis.eu</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default withFirebaseHOC(InfoPage)
