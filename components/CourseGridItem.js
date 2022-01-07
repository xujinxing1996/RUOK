import moment from 'moment';
import React from 'react';
import {
  View,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
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
        style={tw`flex-row h-[130px] mb-3 p-2 rounded-xl border-gray-300 border justify-between`}
      >
        <Image style={tw`w-1/3 h-full rounded-xl`} source={{ uri: imageUrl }} />
        <View style={tw`w-[65%] justify-evenly`}>
          <TitleText titleText={title} />
          <BaseText style="mx-2 text-gray-400">{types}</BaseText>
          <Tooltip
            backgroundColor="#afe0fc"
            popover={<Text>{description}</Text>}
          >
            <BaseText style="mx-2 text-gray-400" numberOfLines={3}>
              {description}
            </BaseText>
          </Tooltip>
        </View>
      </View>
    );
  }
  return contentEl;
};

export default CourseGridItem;
