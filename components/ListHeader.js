import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import tw from 'twrnc';

const ListHeader = ({ title, onSelect }) => {
  return (
    <View style={tw`bg-gray-200 px-3 py-1 flex-row justify-between`}>
      <Text style={tw.style('text-base', { fontFamily: 'NotoSansSc-Bold' })}>{title}</Text>
      <Pressable onPress={onSelect}>
        <Text style={tw.style('text-sm', { fontFamily: 'NotoSansSc-Regular' })}>更多</Text>
      </Pressable>
    </View>
  );
};

export default ListHeader;
