import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 17,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2579ff',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 20,
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 75,
    backgroundColor: '#2679ff',
  },
  box: {
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderWidth: 6,
    borderColor: '#2679ff',
    borderTopLeftRadius: 50, // Adjust the value for the desired roundness
    borderTopRightRadius: 50, // Adjust the value for the desired roundness
    borderBottomRightRadius: 50, // Adjust the value for the desired roundness
    borderBottomLeftRadius: 50, // Adjust the value for the desired roundness
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  registButton: {
    color: 'white',
  },
});
