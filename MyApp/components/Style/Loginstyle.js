/* 
 style
 2023-09-06//이상용//Login Style
 2023-09-10//이상용//Login design , 폰트적용
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
    backgroundColor: '#f9f9f9',
    padding : 13,
    width : 375,
    height : 812
  },
  texts:{
    width: 63,
  height: 24,
  fontFamily: "LeferiBaseType",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.42,
  textAlign: "left",
  color: "#868686"
  },
  invalidName : {
    width: 114,
    height: 27,
    fontFamily: 'LeferiBaseType',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.47,
    textAlign: 'left',
    color: '#868686',
  },
  
  
});
