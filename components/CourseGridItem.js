import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import TitleText from './TitleText';

const CourseGridItem = ({ isTeacher, title, types, description, date, onSelectCourse }) => {
  let contentEl = (
    <>
      <Pressable style={tw`w-1/2 bg-blue-500 rounded-xl h-full`} onPress={onSelectCourse}>
        <View></View>
      </Pressable>
      <View style={tw`w-1/2 h-full px-3`}>
        <TitleText titleText={title} />
        <Text style={{ paddingBottom: 8 }} numberOfLines={1}>
          {description}
        </Text>
        <Text style={{ paddingBottom: 8 }}>{date}</Text>
        <Text>369人已报名</Text>
      </View>
    </>
  );
  if (isTeacher) {
    contentEl = (
      <>
        <View style={tw`w-1/3 bg-blue-500 rounded-xl`}></View>
        <View style={tw`w-2/3 h-full px-3`}>
          <TitleText titleText={title} />
          <Text style={{ paddingBottom: 8 }}>{types}</Text>
          <Text style={{ paddingBottom: 8 }} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </>
    );
  }
  return <View style={tw`flex-row mb-3 h-[130px]`}>{contentEl}</View>;
};

export default CourseGridItem;
