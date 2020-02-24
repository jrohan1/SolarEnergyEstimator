import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
  },
  infoMessageStyle: {
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'justify',
    marginLeft :10,
    marginRight:10,
  },
  headerStyle: {
    fontSize: 30,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'justify',
    marginTop: 50,
    marginLeft :10,
    marginRight:10,
    marginBottom: 15
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
    alignSelf: 'center'
  }
})