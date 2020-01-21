import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  textInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    backgroundColor: 'white',
    fontFamily: 'josefinSans',
    fontSize: 25,
    color: '#4160A1',
    textAlign: 'center'
  },
  suggestions: {
    fontFamily: 'josefinSans',
    color: '#4160A1',
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    position: 'absolute',
    bottom: 25
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'josefinSans',
    color: '#4160A1',
    textAlign:'center',
    margin:10
  }
})