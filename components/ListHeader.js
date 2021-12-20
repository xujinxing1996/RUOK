import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

const ListHeader = ({ title, onSelect }) => {
  return (
    <View style={tw`bg-gray-100 px-3 py-2 mb-3.5 flex-row justify-between`}>
      <Text style={tw.style('text-base', { fontFamily: 'NotoSansSc-Bold' })}>
        {title}
      </Text>
      <Pressable onPress={onSelect}>
        <Icon name="ios-chevron-forward" type="ionicon" />
      </Pressable>
    </View>
  );
};

export default ListHeader;
