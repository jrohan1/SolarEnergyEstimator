import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100
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
  subTextStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    margin:10
  }
})