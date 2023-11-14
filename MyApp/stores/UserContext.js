import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    nickname: '',
    birth: '',
    gender: '',
    uuid: '',
    image: '',
    message: '',
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// 훅을 만들어서 컴포넌트에서 쉽게 사용할 수 있도록 합니다.
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
