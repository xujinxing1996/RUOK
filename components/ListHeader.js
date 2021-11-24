import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import tw from 'twrnc';

const ListHeader = ({ title, onSelect }) => {
  return (
    <View style={tw`w-full bg-gray-200 px-3 py-2 flex-row justify-between`}>
      <Text style={tw.style('text-base', { fontFamily: 'NotoSansSc-Bold' })}>{title}</Text>
      <Pressable onPress={onSelect}>
        <Text style={tw.style('text-base', { fontFamily: 'NotoSansSc-Regular' })}>更多</Text>
        {/* <View
          style={tw`bg-blue-500 flex-1 rounded-[10px] shadow-black shadow-opacity-26 shadow-offset-[0px]/[2px] shadow-radius-[10px] elevation-3 p-[15px] justify-end items-end`}
        >
          <Text numberOfLines={1}>
            更多
          </Text>
        </View> */}
      </Pressable>
    </View>
  );
};

export default ListHeader;
