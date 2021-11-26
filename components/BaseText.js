import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';

const BaseText = ({ style, children, ...props }) => {
  return (
    <Text style={tw`text-sm ${style}`} {...props}>
      {children}
    </Text>
  );
};

export default BaseText;
