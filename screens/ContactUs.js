import React, { Component, Fragment } from 'react';
import { AsyncStorage, View, TouchableOpacity, Alert } from 'react-native';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import SmallLogo from '../components/SmallLogo';
import { withFirebaseHOC } from '../config/Firebase';
import { styles } from '../stylesheets/MainStyles';
import { customStyles } from '../stylesheets/ContactUsStyles';
import ContactUsBanner from '../components/ContactUs';
import MenuButton from '../components/MenuButton';
import { Text, Icon, Card, CardItem, Item, Body, Right, Left } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import { CONTACT_US, USER_INFO } from 'react-native-dotenv';
import ErrorMessage from '../components/ErrorMessage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(5, 'Must have at least 5 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number required')
});

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      mobile: null,
      email: null,
      area: [],
      pitch: '',
      orientation: '',
      shading: '',
      hotWater: '',
      energyUsage: '',
      electricCar: '',
      timeOccupied: ''
    };
  }

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

  postMsg = (values, actions) => {
    const { name, mobile, email } = values;
    this.setState({
      name: name,
      mobile: mobile,
      email: email,
    });

    if (this.state.email != null) {
      fetch(CONTACT_US, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "mobile": mobile,
          "email": email,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.name != null) {
            this.setState({
              isSubmited: true,
            })
          }
          else {
            Alert.alert(
              'Oops !',
              'Something went wrong',
              [
                { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              ],
              { cancelable: false }
            )
          }

        })
        .done();
    }
    else {
      Alert.alert(
        'Oops !',
        'Press SUBMIT button after entering your email address.',
        [
          { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
    actions.setSubmitting(false);
  };

  shareInfo = (name, mobile, email, area, pitch, orientation, shading, hotWater, energyUsage, electricCar, timeOccupied) => {
    if (this.state.name != null) {
      fetch(USER_INFO, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "mobile": mobile,
          "email": email,
          "area": area,
          "pitch": pitch,
          "orientation": orientation,
          "shading": shading,
          "hotWater": hotWater,
          "energyUsage": energyUsage,
          "electricCar": electricCar,
          "timeOccupied": timeOccupied
        }),
      })
    }
  }

  togglePostCard = () => {
    this.setState({
      name: null,
      mobile: null,
      email: null,
      isSubmited: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ marginBottom: 60 }} onPress={this.goToHome}>
          <SmallLogo />
          <MenuButton navigation={this.props.navigation} />
        </TouchableOpacity>
        <HideWithKeyboard>
          <ContactUsBanner />
        </HideWithKeyboard>
        <View style={styles.questionStyle}>
          <Text style={styles.textStyle}>Please enter your contact details</Text>
        </View>
        {this.state.isSubmited ?
          <Card style={customStyles.cardStyle}>
            <View>
              <CardItem>
                <Left></Left>
                <Body></Body>
                <Right>
                  <TouchableOpacity success onPress={() => this.togglePostCard()}>
                    <Icon active type="FontAwesome" name="close" style={customStyles.closeButtonStyle} />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem header>
                <Icon active name="ios-checkmark-circle" style={customStyles.checkMarkStyle} />
                <Text style={customStyles.textStyle}>Thank you. We will get in touch with you as soon as possible</Text>
              </CardItem>
              <CardItem>
                <Text style={{ flex: 1 }}>To help our agents to understand your solar pv needs please share the information you have used in your calculations with us by clicking the button below.</Text>
              </CardItem>
              <CardItem>
                <Left></Left>
                <Body>
                  <TouchableOpacity success onPress={() => {
                    this.shareInfo(
                      this.state.name,
                      this.state.mobile,
                      this.state.email,
                      this.state.area,
                      this.state.pitch,
                      this.state.orientation,
                      this.state.shading,
                      this.state.hotWater,
                      this.state.energyUsage,
                      this.state.electricCar,
                      this.state.timeOccupied
                    ); this.togglePostCard()
                  }}>
                    <Icon active type="FontAwesome" name="share" style={customStyles.shareButtonStyle} />
                  </TouchableOpacity>
                </Body>
                <Right></Right>
              </CardItem>
            </View>
          </Card>
          :
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: ''
            }}
            onSubmit={(values, actions) => {
              this.postMsg(values, actions)
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting
            }) => (
                <Fragment>
                  <FormInput
                    name='name'
                    value={this.state.name}
                    onChangeText={handleChange('name')}
                    placeholder='Enter your full name'
                    iconName='md-person'
                    iconColor='#DEE48E'
                    onBlur={handleBlur('name')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='mobile'
                    value={this.state.mobile}
                    onChangeText={handleChange('mobile')}
                    placeholder='Enter phone number'
                    iconName='ios-phone-portrait'
                    iconColor='#DEE48E'
                    onBlur={handleBlur('mobile')}
                  />
                  <ErrorMessage errorValue={touched.mobile && errors.mobile} />
                  <FormInput
                    name='email'
                    value={this.state.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#DEE48E'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <View>
                    <TouchableOpacity
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                      onPress={handleSubmit}>
                      <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                  <ErrorMessage errorValue={errors.general} />
                </Fragment>
              )}
          </Formik>
        }
      </View>
    )
  }
}

export default withFirebaseHOC(ContactUs)