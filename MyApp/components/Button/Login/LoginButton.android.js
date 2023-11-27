import React from 'react';
import {Text, KeyboardAvoidingView} from 'react-native';
import {Button} from 'native-base';

const LoginButton = props => {
  return (
    <View
      style={{justifyContent: 'flex-end', alignItems: 'center'}}
      behavior={'padding'}
      keyboardVerticalOffset={90}>
      <Button
        title="next"
        onPress={() => {
          handleLogin();
        }}
        style={style.login_button_style}>
        <Text style={style.invalidName}>로그인</Text>
      </Button>
    </View>
  );
};

export default LoginButton;
