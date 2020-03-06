import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#4160A1',
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
    paddingHorizontal: 5,
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
  zoomButtonContainer: {
    marginTop: 100,
    position: 'absolute',
    right: 20,
    width: 80
  },
  zoomButtons: {
    color: '#4160A1',
    padding: 5
  },
  deleteButton: {
    marginVertical: 20,
    position: 'absolute',
    bottom: 80
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'josefinSans',
    color: '#4160A1',
    textAlign: 'center',
    margin: 10
  },
  areaTextStyle: {
    backgroundColor: 'white',
    width: '30%',
    borderColor: 'black',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'josefinSans',
    color: '#4160A1',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    borderWidth: 0.5,
  },
  dropdownAreaStyle: {
    backgroundColor: 'white',
    width: '30%',
    borderColor: 'black',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'josefinSans',
    color: '#4160A1',
    textAlign: 'center',
    marginLeft: 10,
    padding: 5,
    borderWidth: 0.5,
  },
  cardStyle: {
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 30
  },
  closeButtonStyle: {
    fontSize: 25,
    color: 'black',
    marginLeft: 10,
    color: 'navy'
  },
  cardTextStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'josefinSans',
    color: 'navy',
  },
  startButton: {
    backgroundColor: '#DEE48E',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: '#4160A1',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 10,
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    width: 100
  },
  tutorialButton: {
    fontSize: 20,
    fontFamily: 'josefinSans',
    color: 'navy',
    borderBottomWidth: 1,
    borderColor: '#4160A1',
    alignSelf: 'center'
  }
})