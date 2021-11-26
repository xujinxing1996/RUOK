import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import TitleText from '../components/TitleText';
import BaseText from '../components/BaseText';

const VideoDetailScreen = () => {
  return (
    <View>
      <View style={tw`bg-blue-500 h-[200px]`}></View>
      <View style={tw`m-3`}>
        <TitleText titleText="媒体名称" />
      </View>
      <View style={tw`h-[9px] bg-gray-200`}></View>
      <View style={tw`p-3 border-b border-gray-300`}>
        <TitleText titleText="一建理论精讲班" />
      </View>
      <View style={tw`p-3 border-b border-gray-300 flex-row items-center`}>
        <Ionicons name="ios-book" />
        <BaseText style="ml-1">课程目录</BaseText>
      </View>
      <View style={tw`p-3 flex-row items-center`}>
        <Ionicons name="ios-map" />
        <BaseText style="ml-1">课程子目录</BaseText>
      </View>
      <View style={tw`ml-9 p-2 my-1 border-b border-gray-300 flex-row justify-around`}>
        <BaseText style="text-red-400">2021一级建造师备考导学 上</BaseText>
        <BaseText style="text-red-400">高清</BaseText>
        <BaseText style="px-3 font-bold bg-indigo-200 text-blue-500 rounded-xl">100%</BaseText>
      </View>
      <View style={tw`ml-9 p-2 my-1 border-b border-gray-300 flex-row justify-around`}>
        <BaseText>2021一级建造师备考导学 上</BaseText>
        <BaseText>高清</BaseText>
        <BaseText style="px-3 font-bold bg-indigo-200 text-blue-500 rounded-xl">100%</BaseText>
      </View>
    </View>
  );
};

export default VideoDetailScreen;
