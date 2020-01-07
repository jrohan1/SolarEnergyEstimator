import React, { Component, Fragment } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import MenuButton from '../components/MenuButton'
import { styles } from '../stylesheets/SignupStyles'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class Signup extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }))
  }

  handleOnSignup = async (values, actions) => {
    const { name, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid }
        await this.props.firebase.createNewUser(userData)
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.iconContainer}>
          <Ionicons name='md-contact' size={80} color='#DEE48E' />
        </View>
        <View>
          <Text style={styles.textstyle}>Create an account</Text>
        </View>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            check: false
          }}
          onSubmit={(values, actions) => {
            this.handleOnSignup(values, actions)
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
            isSubmitting,
            setFieldValue
          }) => (
              <Fragment>
                <FormInput
                  name='name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder='Enter your full name'
                  iconName='md-person'
                  iconColor='#DEE48E'
                  onBlur={handleBlur('name')}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
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
                  iconName='ios-lock'
                  iconColor='#DEE48E'
                  onBlur={handleBlur('password')}
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color='#DEE48E' />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormInput
                  name='password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='Confirm password'
                  iconName='ios-lock'
                  iconColor='#DEE48E'
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity
                      onPress={this.handleConfirmPasswordVisibility}>
                      <Ionicons
                        name={confirmPasswordIcon}
                        size={28}
                        color='#DEE48E'
                      />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <CheckBox
                  containerStyle={styles.checkBoxContainer}
                  checkedIcon='check-box'
                  iconType='material'
                  uncheckedIcon='check-box-outline-blank'
                  title='Agree to terms and conditions'
                  checkedTitle='You agreed to our terms and conditions'
                  checked={values.check}
                  checkedColor='#DEE48E'
                  textStyle={styles.checkboxText}
                  onPress={() => setFieldValue('check', !values.check)}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                    onPress={handleSubmit}>
                    <Text style={styles.button}>Sign up</Text>
                  </TouchableOpacity>
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
        </Formik>
        <Button
          title='Have an account? Login'
          onPress={this.goToLogin}
          titleStyle={styles.subText}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

export default withFirebaseHOC(Signup)
