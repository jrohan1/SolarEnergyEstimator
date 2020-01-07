import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
  },
  grid: {
    flex: 1,
    backgroundColor: '#4160A1',
    marginTop: 120,
    marginBottom: 40,
    marginLeft: 40
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'josefinSans',
    color: '#DEE48E'
  },
  textInput: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DEE48E',
    fontSize: 18,
    color: '#DEE48E',
    fontSize: 20,
    fontFamily: 'josefinSans',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#DEE48E',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: '#4160A1',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    width: 140,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20
  },
  dropdown: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DEE48E'
  },
  dropdownText: {
    fontSize: 18,
    color: '#DEE48E',
    fontSize: 20,
    fontFamily: 'josefinSans',
    textAlign: 'center'
  },
  dropdownStyle: {
    width: 100,
    height: 105,
    borderColor: '#4160A1',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownListText: {
    borderWidth: 1,
    borderColor: '#4160A1',
    fontSize: 20,
    fontFamily: 'josefinSans',
    textAlign: 'center',
    color: '#4160A1'
  },
  largeDropdown: {
    width: 110,
    height: 260,
    borderColor: '#4160A1',
    borderWidth: 2,
    borderRadius: 3,
  }
})