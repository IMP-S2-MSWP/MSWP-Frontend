import React from 'react';
import {Text, KeyboardAvoidingView} from 'react-native';
import {Button} from 'native-base';
import style from './LoginButton.style';

const LoginButton = props => {
  return (
    <KeyboardAvoidingView
      style={{justifyContent: 'flex-end', alignItems: 'center'}}
      behavior={'padding'}
      keyboardVerticalOffset={90}>
      <Button
        title="next"
        onPress={() => {
          props.handleLogin();
        }}
        style={style.login_button_style}>
        <Text style={style.invalidName}>로그인</Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

export default LoginButton;
