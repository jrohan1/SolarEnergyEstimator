import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
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
        //androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '485925801640-scojein741ij5kd4j4bhvtool6j0sgtq.apps.googleusercontent.com',
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
        <HideWithKeyboard style={styles.logoContainer}>
        <MenuButton navigation={this.props.navigation} />
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
              <Text style={styles.orStyle}>or</Text>
              <TouchableOpacity
                //activeOpacity={0.5}
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                onPress={this.signInWithGoogleAsync}>
                <Image
                  source={require('../assets/googleSignIn.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
    paddingTop: 50
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  googleLogInStyle: {
    width: 300, 
    height: 60, 
    alignSelf: 'center',
    marginTop: 20, 
    marginBottom: 20
  },
  button: {
    backgroundColor: '#DEE48E',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: '#4160A1',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    width:160,
    borderRadius:10,
    alignSelf: 'center',
    marginTop: 20
  },
  orStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    margin:10
  }
})

export default withFirebaseHOC(Login)
