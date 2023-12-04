import {StyleSheet} from 'react-native';
import {Image} from 'native-base';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontWeight: 'bold',
    margin: 14,
    marginBottom: 34,
    fontSize: 20,
    alignSelf: 'flex-start',
    color: '#2679ff',
  },
  headerBox: {
    borderColor: '#2679ff',
    padding: 2,
    borderBottomWidth: 2,
    mb: 5,
    width: 370,
    height: 100,
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2679ff',
  },
  pressableItem: {
    padding: 1,
    margin: 1,
    marginBottom: 1,
    borderBottomWidth: 0,
  },
  image: {
    borderRadius: 14,
  },
  itemName: {
    fontSize: 16,
  },
  itemMessage: {
    // Replace with actual styles
  },
});
