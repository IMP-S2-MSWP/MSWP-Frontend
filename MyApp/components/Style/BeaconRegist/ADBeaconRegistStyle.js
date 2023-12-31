import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#2679ff',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  bannerImage: {
    width: 400,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
  },
  formContainer: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 80,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: 335,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#2679ff',
    borderRadius: 20,
  },
  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 40,
    marginBottom: 14,
    color: '#2679ff',
  },
  text2: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    margin: 10,
    color: '#2679ff',
  },
  button_style: {
    backgroundColor: '#2679ff',
    borderRadius: 8,
    width: 340,
    height: 56,
    bottom: 25,
  },
  invalidName: {
    width: 60,
    height: 20,
    fontFamily: 'BMJUA_ttf',
    fontSize: 16,
    letterSpacing: 0.42,
    textAlign: 'center',
    color: '#ffffff',
  },
});
