import { StyleSheet } from 'react-native'

export const customStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#4160A1',
  },
  outputText: {
    fontSize: 50,
    fontWeight: '500',
    textAlign: 'center'
  },
  outputTextBox: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 20,
    height: 80,
    width: 100,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'white',
    transform: [{ rotate: '90deg' }]
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 30
  },
  iconStyle: {
    alignSelf: 'flex-end',
    transform: [{ rotate: '90deg' }]
  },
  closeIcon: {
    color: '#fff',
    fontSize: 80
  },
  cameraIcon: {
    color: '#fff',
    fontSize: 60,
    height: 70,
    width: 70, 
  },
  deleteIcon: {  
    fontSize: 60,
    backgroundColor: 'red',
    height: 70,
    width: 70, 
  },
  lineStyle: {
    alignSelf: 'center',
    width: 600,
    borderBottomColor: 'white',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderTopColor: 'white',
    transform: [{ rotate: '90deg' }]
  },
  button: {
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