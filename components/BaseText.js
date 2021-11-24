import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';

const BaseText = ({ style, children }) => {
  return <Text style={tw`text-base ${style}`}>{children}</Text>
};

export default BaseText;