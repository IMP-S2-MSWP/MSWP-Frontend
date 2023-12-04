import {StyleSheet} from 'react-native';
import {Image} from 'native-base';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  makeCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#2679ff',
    position: 'relative', // 절대적인 위치 사용을 위해 필요
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지가 Box에 맞게 크기 조정
    position: 'absolute', // 절대적인 위치 사용
    top: 0,
    left: 0,
  },
  title: {
    fontWeight: 'bold',
    margin: 14,
    marginBottom: 34,
    fontSize: 20,
    alignSelf: 'flex-start',
    color: '#2679ff',
  },
  profileText: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2679ff',
  },
  circleBox: {
    borderWidth: 10,
    borderColor: '#2679ff',
    borderRadius: 300,
    height: 550,
    width: 550,
    marginTop: 2,
    alignSelf: 'center',
  },
  TextInputStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 17,
  },
  IconStyle: {
    borderWidth: 1,
    borderRadius: 150,
    width: 50,
    height: 50,
    backgroundColor: '#808588',
    borderColor: 'grey',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartStyle: {
    borderWidth: 0,
    borderRadius: 150,
    width: 90,
    height: 90,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingStyle: {
    alignSelf: 'center',
    color: '#808588',
  },
});
