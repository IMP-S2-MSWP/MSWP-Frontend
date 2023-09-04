
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';

interface Props {
  onRegister: (username: string, password: string) => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={() => onRegister(username,password)} />
    </>
  );
};

export default RegisterForm;
