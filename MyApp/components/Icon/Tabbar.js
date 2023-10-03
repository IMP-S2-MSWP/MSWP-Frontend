import {Image} from 'react-native'
import  Icon from 'react-native-vector-icons/Ionicons';


const TabBar = (focused,name) =>{
  let iconImagePath;
  if(name==="메인"){
    //iconImagePath= "home"
  }else if (name==="채팅"){
    // iconImagePath="add-circle-sharp"
  }else if (name==="비콘채팅"){
    //iconImagePath="list-circle-sharp"
  }else if (name==="좋아요"){
    //iconImagePath=" "
  }



  return (
    <Icon    
    color= "#0080ff"
    size={20}
    name={iconImagePath}
    
    />
  )
}

export default TabBar