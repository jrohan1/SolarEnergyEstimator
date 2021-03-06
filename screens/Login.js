import React, { Component, Fragment } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/FormInput'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import Expo from 'expo'
import MenuButton from '../components/MenuButton'
import SmallLogo from '../components/SmallLogo'
import { styles } from '../stylesheets/LoginStyles'
import config from '../config'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  goToHome = () => this.props.navigation.navigate('Home')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      const response = await this.props.firebase.loginWithEmail(email, password)

      if (response.user) {
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: config.ANDROID_OAUTH_CREDENTIALS,
        iosClientId: config.IOS_OAUTH_CREDENTIALS,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    const { passwordVisibility, rightIcon } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.goToHome}>
          <SmallLogo/>
        </TouchableOpacity>        
        <MenuButton navigation={this.props.navigation} />
        <HideWithKeyboard style={styles.logoContainer}>
        <Ionicons name='md-contact' size={80} color='#DEE48E' />
        </HideWithKeyboard>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <Fragment>
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#DEE48E'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                secureTextEntry={passwordVisibility}
                iconName='ios-lock'
                iconColor='#DEE48E'
                onBlur={handleBlur('password')}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color='#DEE48E' />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View>
                <TouchableOpacity 
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  onPress={handleSubmit}>
                  <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.subTextStyle}>or</Text>
              <TouchableOpacity
                //activeOpacity={0.5}
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                onPress={this.signInWithGoogleAsync}>
                <Image
                  source={require('../assets/images/googleSignIn.png')}
                  style={styles.googleLogInStyle}
                />
              </TouchableOpacity> 
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#DEE48E',
            fontSize: 18
          }}
          type='clear'
        />
      </SafeAreaView>
    );    
  }
}

export default withFirebaseHOC(Login)
