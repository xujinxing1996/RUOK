import React from 'react';
import { StyleSheet, Text } from 'react-native';
import tw from 'twrnc';

const TitleText = ({ titleText }) => {
  return <Text style={tw.style('text-sm mx-2', { ...styles.title })} numberOfLines={1}>{titleText}</Text>
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'NotoSansSc-Bold',
    // paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
});

export default TitleText;