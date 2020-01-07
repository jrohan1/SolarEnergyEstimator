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
    marginBottom: 50,
    marginLeft: 50    
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
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
    width:200,
    borderRadius:10,
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: -50
  },
  nextButton: {
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
    width:140,
    borderRadius:10,
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: -50
  },
  subTextStyle: {
    fontSize: 20,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft: -50,
    marginTop:10
  }
})