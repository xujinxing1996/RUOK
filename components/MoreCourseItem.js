import React from 'react';
import { Pressable, Text, View } from 'react-native';
import tw from 'twrnc';

const MoreCourseItem = ({ onSelectCourse }) => {
  return (
    <View style={tw`flex-row justify-between my-2`}>
      <View style={tw`w-2/5 bg-blue-500 rounded-xl`}></View>
      <View style={tw`w-4/7 p-4 border border-gray-200 rounded-xl`}>
        <Text style={tw.style('text-sm', { fontFamily: 'NotoSansSc-Bold' })}>
          一建理论精讲班
        </Text>
        <Text style={tw`text-sm text-gray-400 my-3`}>共10期 免费公开课</Text>
        <Pressable style={tw`flex-1 self-end justify-end`} onPress={onSelectCourse} >
          <Text style={tw`text-sm text-blue-500`}>查看详情</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MoreCourseItem;
