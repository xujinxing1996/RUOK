import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = ({ titleText }) => {
  return <Text style={styles.title}>{titleText}</Text>
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'NotoSansSc-Bold',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
});

export default TitleText;