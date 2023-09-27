/* 
 style
 2023-09-07//이상용//Main Style
 2023-09-10//이상용//Main 수정, 폰트적용
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  startBt: {
    marginTop: 255,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 10,
    
 },
 btText: {
  textAlign: 'center',
  fontSize: 16,
  fontFamily:'BMJUA_ttf',
 },
 MainText:{
  textAlign: 'center',
  fontSize: 60,
  marginTop: 200,
  color: '#5a5a5a',
  fontFamily:'BMJUA_ttf',
 },
 SubText:{
  textAlign: 'center',
  fontSize: 30,
  marginTop: 10,
  fontFamily:'BMJUA_ttf',
  color: '#5a5a5a'
 },
 bottomText:{
  marginTop:14,
  fontSize: 14,
  fontFamily:'BMJUA_ttf',
  textAlign:'center',
  alignItems:'center',
  alignSelf:'center',
  color: '#5a5a5a',
  position : 'absolute',
  bottom:90

 },
 container:{
  backgroundColor : '#ffffff',
  padding : 13,
  width : 375,
  height : 812
 },
 imgStyle:{
  position: 'absolute',
  
 }

});
