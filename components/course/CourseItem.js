import React from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';
import tw from 'twrnc';
import moment from 'moment';
import BaseText from '../BaseText';
import TitleText from '../TitleText';

const CourseItem = ({
  imageUrl,
  title,
  description,
  beginDate,
  endDate,
  onSelectCourse,
}) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={tw`shadow-black shadow-opacity-26 shadow-offset-[0]/[2px] shadow-radius-[8px] elevation-6 rounded-xl bg-white h-[300px] m-3`}
    >
      <View style={tw`overflow-hidden rounded-xl`}>
        <TouchableCmp onPress={onSelectCourse} useForeground>
          <View>
            <View style={tw`w-full h-[60%] rounded-tl-xl rounded-tr-xl`}>
              <Image style={tw`w-full h-full`} source={{ uri: imageUrl }} />
            </View>
            <View style={tw`h-[40%] items-center justify-around p-[10px]`}>
              <TitleText titleText={title} />
              <BaseText style="mx-2 text-gray-400" numberOfLines={1}>
                {description}
              </BaseText>
              <BaseText style="mx-2 text-xs text-gray-400">
                {moment(beginDate).format('YYYY.MM.DD')}至{moment(endDate).format('YYYY.MM.DD')}
              </BaseText>
              <BaseText style="mx-2 text-xs text-gray-400">
                369人已报名
              </BaseText>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

export default CourseItem;
