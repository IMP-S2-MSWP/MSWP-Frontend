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
import style from "../../components/Style/Signup/style"
 const SignUp=()=>{
   const [pageIndex,setPageIndex] = useState(0);
   const pagerRef = useRef(null);
   const [passwordConfirmation, setPasswordConfirmation] = useState('');

   const [userData,setUserData] = useState({
     name: '',
     gender: '',
     dob: '',
     username: '',
     password: '',
     nickname:''
   });
   const [passwordsDoNotMatch,setpasswordsDoNotMatch] = useState(false);
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
    if(pageIndex === 2 && userData.password !== passwordConfirmation){ // 추가된 부분
      setpasswordsDoNotMatch(true)
      alert("Passwords do not match.");
        return;
    }

    if(canGoNext()) {
       setPageIndex(prevPageIndex=> prevPageIndex+1)
       pagerRef.current.setPage(pageIndex +1);
    }
}


return(
<View style={{flex :1, backgroundColor:"white"}}>
<PagerView ref={pagerRef} style={{ flex :1 }} initialPage={0} scrollEnabled={false} onPageSelected={e=>setPageIndex(e.nativeEvent.position)}>
<NameGenderDOBpage key="1" handleInputChange={handleInputChange} userData={userData}/>
<UserNamepage key="2" handleInputChange={handleInputChange} userData={userData}/>
<Passwordpage key="3" handleInputChange={handleInputChange} userData={userData} passwordConfirmation ={passwordConfirmation} setPasswordConfirmation ={setPasswordConfirmation} passwordsDoNotMatch={passwordsDoNotMatch} />
<NickNamepage key="4" handleInputChange={handleInputChange} userData={userData}/>
<Completepage key="5" />
</PagerView>
{canGoNext() &&
(<Button title="next" onPress={()=>{
handleNextClick();
}}
style={style.button_style}
>
<Text style={style.invalidName}>다음</Text>
</Button>
)
  
}
</View>
)
}

export default SignUp