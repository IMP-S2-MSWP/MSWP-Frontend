import React from 'react';
import LottieView from 'lottie-react-native';

const Check = () => {
  return (<LottieView  style={{height:"70%", width:"70%"}} source={require('./source/Check.json')} autoPlay loop={false}/>
  )
};

export default Check;