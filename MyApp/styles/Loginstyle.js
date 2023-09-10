/* 
 style
 2023-09-06//이상용//Login Style
 2023-09-10//이상용//Login design , 폰트적용
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: '#848484'
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:5,
    backgroundColor:'gray',
    alignItems : 'center',
    justifyContent :'center',
    borderColor:"#E6E6E6",
    fontFamily:'BMJUA_ttf',
  
 },
 btText: {
  textAlign: 'center',
  fontSize: 16,
  fontFamily:'BMJUA_ttf',
 },

 startBt: {
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  width: 350,
  height: 40,
  backgroundColor: '#ccc',
  borderRadius: 10,
  marginTop:10,
},
  helloText:{
    fontSize:40,
    marginBottom:20,
    color:'#E6E6E6',
    fontFamily:'BMJUA_ttf',
  },
  inputFocused:{
    borderColor:'#424242',
    backgroundColor:'#F2F2F2'
  }
});
