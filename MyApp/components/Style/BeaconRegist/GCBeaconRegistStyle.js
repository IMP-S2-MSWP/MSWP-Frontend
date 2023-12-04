import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: 250,
    height: 250,
    borderRadius: 400,
    alignSelf: 'center',
    borderWidth: 1,
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 80,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: 320,
    borderRightWidth: 6,
    borderLeftWidth: 6,
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
});
