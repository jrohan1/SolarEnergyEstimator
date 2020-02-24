import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
  },
  questionStyle: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10,
  },
  subTextStyle: {
    fontSize: 20,
    fontFamily: 'josefinSans',
    color: '#DEE48E',
    textAlign:'center',
    marginLeft :10,
    marginRight:10
  },
  answerTextStyle: {
    fontSize: 30,
    fontFamily: 'josefinSans',
    color: 'white',
    textAlign:'center',
    marginTop: 10,
    marginLeft :10,
    marginRight:10,
  },
  inputStyle: {
    fontSize: 25,
    fontFamily: 'josefinSans',
    color: '#4160A1',
    textAlign:'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DEE48E',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center'
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    padding: 10,
    textAlign:'center',
    marginLeft :10,
    marginRight:10,
    marginBottom :20,
    alignSelf: 'center'
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
    borderRadius:10,
    marginLeft :30,
    marginRight:30,
    marginBottom :30,
  },
  checkMarkStyle: {
    fontSize: 50,
    color: '#4CAF50',
    alignSelf: 'center',
    marginBottom: 10
  }
})