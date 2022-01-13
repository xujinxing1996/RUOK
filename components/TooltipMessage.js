import React, { useState } from 'react';
import tw from 'twrnc';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Image, Pressable, Text } from 'react-native';
import BaseText from './BaseText';
import { View } from 'react-native';

const TooltipMessage = ({ item }) => {
  const [showTip, setShowTip] = useState(false);
  
  return (
    <View
      style={tw`p-3.5 m-2 rounded-xl border border-gray-400 flex-row justify-between`}
    >
      <Image
        style={tw`w-[40%] h-full rounded-xl`}
        source={{ uri: item.teacherImage }}
      />
      <View style={tw`w-[50%]`}>
        <Text style={tw.style('text-sm', { fontFamily: 'NotoSansSc-Bold' })}>
          {item.teacherName}
        </Text>
        <BaseText style="text-gray-500 my-2">{item.teacherCourse}</BaseText>
        <Pressable onPress={() => setShowTip((value) => !value)}>
            <BaseText style="text-gray-500" numberOfLines={!showTip ? 4 : 20}>
              {item.teacherDesc}
            </BaseText>
          </Pressable>
        {/* <Tooltip
          isVisible={showTip}
          placement="bottom"
          onClose={() => setShowTip(false)}
          content={<Text>{item.teacherDesc}</Text>}
        >
          <Pressable onPress={() => setShowTip(true)}>
            <BaseText style="text-gray-500" numberOfLines={4}>
              {item.teacherDesc}
            </BaseText>
          </Pressable>
        </Tooltip> */}
      </View>
    </View>
  );
};

export default TooltipMessage;