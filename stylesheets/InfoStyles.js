import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4160A1',
  },
  blockStyle: {
    marginTop: 20,
    marginBottom: 20
  },
  questionStyle: {
    fontSize: 22,
    fontFamily: 'Roboto_medium',
    color: '#DEE48E',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  answerStyle: {
    fontSize: 18,
    fontFamily: 'Roboto_medium',
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 30,
  },
  link: {
    color: 'navy',
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})