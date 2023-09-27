// SignUp.js

import React,{ useState, useRef } from "react";
import {View,Text }from "react-native";
import PagerView from "react-native-pager-view";
import NameGenderDOBpage from "./NameGenderDobPage"
import UserNamepage     from "./UsernamePage"
import Passwordpage     from "./PasswordPage"
import NickNamepage     from "./NickNamePage"
import Completepage     from "./Completepage"
import { Button } from "native-base";
 const SignUp=()=>{
   const [pageIndex,setPageIndex] = useState(0);
   const pagerRef = useRef(null);
   const [userData,setUserData] = useState({
     name: '',
     gender: '',
     dob: '',
     username: '',
     password: '',
     nickname:''
   });

   const handleInputChange = (name) => (text) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: text,
    }));
  };
  const handleGenderChange = (nextValue) => {
    setUserData((prevData) => ({
      ...prevData,
      gender: nextValue,
    }));
  };

  const canGoNext = () => {
    switch(pageIndex){
      case 0:
        return userData.name && userData.gender && userData.dob;
      case 1:
        return userData.username;
      case 2:
        return userData.password;
      case 3:
        return userData.nickname;
    }
  }

  const handleNextClick=()=>{
    if(canGoNext()) {
       setPageIndex(prevPageIndex=> prevPageIndex+1)
       pagerRef.current.setPage(pageIndex +1);
    }
}
const invalidName = {
    width: 32,
    height: 20,
    fontFamily: "LeferiBaseType",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.42,
    textAlign: "center",
    color: "#ffffff"
  };
  const asd = {
    backgroundColor: "#2679ff",
    borderRadius: 8,
    width: 335,
    height: 56,
    bottom: 20,
    left: 20,
  };

return(
<View style={{flex :1}}>
<PagerView ref={pagerRef} style={{ flex :1 }} initialPage={0} scrollEnabled={false} onPageSelected={e=>setPageIndex(e.nativeEvent.position)}>
<NameGenderDOBpage key="1" handleInputChange={handleInputChange} handleGenderChange={handleGenderChange} userData={userData}/>
<UserNamepage key="2" handleInputChange={handleInputChange} userData={userData}/>
<Passwordpage key="3" handleInputChange={handleInputChange} userData={userData}/>
<NickNamepage key="4" handleInputChange={handleInputChange} userData={userData}/>
<Completepage key="5" />
</PagerView>
{canGoNext() &&
(<Button title="next" onPress={()=>{
handleNextClick();
}}
style={asd}
>
<Text style={invalidName}>다음</Text>
</Button>
)
  
}
</View>
)
}

export default SignUp