import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import tw from 'twrnc';

const MoreCourseItem = ({
  imageUrl,
  title,
  description,
  onSelectCourse,
}) => {
  return (
    <View style={tw`flex-row justify-between my-2`}>
      <Image style={tw`w-2/5 rounded-xl`} resizeMode="stretch" source={{ uri: imageUrl }} />
      <View style={tw`w-4/7 p-4 border border-gray-200 rounded-xl`}>
        <Text style={tw.style('text-sm', { fontFamily: 'NotoSansSc-Bold' })}>
          {title}
        </Text>
        <Text numberOfLines={1} style={tw`text-sm text-gray-400 my-3`}>{description}</Text>
        <Pressable
          style={tw`flex-1 self-end justify-end`}
          onPress={onSelectCourse}
        >
          <Text style={tw`text-sm text-blue-500`}>查看详情</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MoreCourseItem;
