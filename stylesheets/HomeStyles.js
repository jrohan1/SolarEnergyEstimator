import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
    alignItems: 'center'
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
    marginLeft :10,
    marginRight:10,
    marginTop :30,
    marginBottom: 30,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  headerStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10,
    marginBottom: 50
  }, 
  textStyle: {
    fontSize: 20,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10
  },
  loginButtonStyle: {
    fontSize: 20,
    color: '#DEE48E',
    borderBottomWidth: 1,
    borderColor: '#DEE48E',
    marginBottom: 20
  },
  subTextStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    lineHeight: 38,
    marginLeft :10,
    marginRight:10
  }
})
