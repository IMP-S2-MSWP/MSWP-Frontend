// WennectTitle.js

import React from 'react';
import {Text} from 'react-native';

/**
 * Wennect 타이틀을 표시하는 컴포넌트입니다.
 * @returns {JSX.Element} Wennect 타이틀 컴포넌트.
 */
const WennectTitle = ({customStyle}) => {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        margin: 14,
        fontSize: 20,
        alignSelf: 'flex-start',
        color: '#2679ff',
        ...customStyle,
      }}>
      Wennect
    </Text>
  );
};

export default WennectTitle;
