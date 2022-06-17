import moment from 'moment';
import React, { useState } from 'react';
import {
  View,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Pressable,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Colors from '../constants/Colors';
import BaseText from './BaseText';
import TitleText from './TitleText';

const CourseGridItem = ({
  isTeacher,
  imageUrl,
  title,
  types,
  description,
  beginDate,
  endDate,
  onSelectCourse,
}) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const [showTip, setShowTip] = useState(false);

  let contentEl = (
    <View style={tw`mx-3 mb-3.5 flex-row h-[130px]`}>
      <TouchableCmp onPress={onSelectCourse} useForeground>
        <View style={tw`flex-row h-full`}>
          <Image
            style={tw`w-1/2 h-full rounded-xl`}
            resizeMode="stretch"
            source={{ uri: imageUrl }}
          />
          <View style={tw`w-1/2 justify-evenly`}>
            <TitleText titleText={title} />
            <BaseText style="mx-2 text-gray-400" numberOfLines={1}>
              {description}
            </BaseText>
            <BaseText style="mx-2 text-xs text-gray-400">
              {moment(beginDate).format('YYYY.MM.DD')}至
              {moment(endDate).format('YYYY.MM.DD')}
            </BaseText>
            <BaseText style="mx-2 text-xs text-gray-400">369人已报名</BaseText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
  if (isTeacher) {
    contentEl = (
      <View
        style={tw`flex-row mb-3 p-2 rounded-xl border-gray-300 border justify-between`}
      >
        <Image style={tw`w-1/3 h-[140px] rounded-xl`} source={{ uri: imageUrl }} />
        <View style={tw`w-[65%] justify-evenly`}>
          <TitleText titleText={title} />
          <BaseText style="mx-2 text-gray-400">{types}</BaseText>
          <Pressable onPress={() => setShowTip((value) => !value)}>
            <BaseText style="mx-2 text-gray-400" numberOfLines={!showTip ? 3 : 20}>
              {description}
            </BaseText>
          </Pressable>
        </View>
      </View>
    );
  }
  return contentEl;
};

export default CourseGridItem;
