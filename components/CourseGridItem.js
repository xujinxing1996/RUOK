import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import BaseText from './BaseText';
import TitleText from './TitleText';

const CourseGridItem = ({ isTeacher, title, types, description, date, onSelectCourse }) => {
  let contentEl = (
    <>
      <Pressable style={tw`w-1/2 bg-blue-500 rounded-xl`} onPress={onSelectCourse}>
        <View></View>
      </Pressable>
      <View style={tw`w-1/2 justify-evenly`}>
        <TitleText titleText={title} />
        <BaseText style="mx-2 text-gray-400" numberOfLines={1}>
          {description}
        </BaseText>
        <BaseText style="mx-2 text-xs text-gray-400">{date}</BaseText>
        <BaseText style="mx-2 text-xs text-gray-400">369人已报名</BaseText>
      </View>
    </>
  );
  if (isTeacher) {
    contentEl = (
      <>
        <View style={tw`w-1/3 bg-blue-500 h-full rounded-xl`}></View>
        <View style={tw`w-2/3 justify-evenly`}>
          <TitleText titleText={title} />
          <BaseText style="mx-2 text-gray-400">{types}</BaseText>
          <BaseText style="mx-2 text-gray-400" numberOfLines={3}>
            {description}
          </BaseText>
        </View>
      </>
    );
  }
  return <View style={tw`flex-row mb-3 h-[130px]`}>{contentEl}</View>;
};

export default CourseGridItem;
