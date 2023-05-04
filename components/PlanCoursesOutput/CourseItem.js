import React from 'react';
import { Pressable, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import tw from 'twrnc';
import TitleText from '../TitleText';
import BaseText from '../BaseText';

function CourseItem({
  classId,
  classImage,
  className,
  packagePrice,
  beginTime,
  endTime,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('UserCourseDetail', { courseId: classId })
      }
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={tw`m-1.5 p-2.5 bg-white rounded-xl flex-row justify-between`}
      >
        <Image
          style={tw`w-[40%] rounded-xl`}
          resizeMode="stretch"
          source={{ uri: classImage }}
        />
        <View style={tw`w-[55%]`}>
          <TitleText titleText={className} />
          <View style={tw`flex-row mt-2`}>
            <BaseText style="p-1.5 font-bold bg-indigo-200 text-blue-500 rounded-xl">
              {packagePrice > 0 ? '精品课程' : '免费课程'}
            </BaseText>
          </View>
          <BaseText style="text-gray-500 text-sm">
            {moment(beginTime).format('YYYY-MM-DD')}-
            {moment(endTime).format('YYYY-MM-DD')}
          </BaseText>
          <BaseText style="text-gray-500">已学20%</BaseText>
        </View>
      </View>
    </Pressable>
  );
}

export default CourseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
