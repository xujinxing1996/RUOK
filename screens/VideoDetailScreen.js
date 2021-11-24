import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import TitleText from '../components/TitleText';

const VideoDetailScreen = () => {
  return (
    <View>
      <View style={tw`bg-blue-500 h-[200px]`}></View>
      <View style={tw`mx-5`}>
        <TitleText titleText="媒体名称" />
      </View>
      <View style={tw`h-[9px] bg-gray-200`}></View>
      <View style={tw`px-5 border-b border-gray-300`}>
        <TitleText titleText="一建理论精讲班" />
      </View>
      <View style={tw`p-3 border-b border-gray-300 flex-row items-center`}>
        <Ionicons name="ios-book" />
        <Text style={tw`ml-1`}>课程目录</Text>
      </View>
      <View style={tw`p-3 flex-row items-center`}>
        <Ionicons name="ios-map" />
        <Text style={tw`ml-1`}>课程子目录</Text>
      </View>
      <View style={tw`ml-9 p-2 border-b border-gray-300 flex-row justify-around`}>
        <Text style={tw`text-red-400`}>2021一级建造师备考导学 上</Text>
        <Text style={tw`text-red-400`}>高清</Text>
        <Text style={tw`px-3 font-bold bg-indigo-200 text-blue-500 rounded-xl`}>100%</Text>
      </View>
      <View style={tw`ml-9 p-2 border-b border-gray-300 flex-row justify-around`}>
        <Text>2021一级建造师备考导学 上</Text>
        <Text>高清</Text>
        <Text style={tw`px-3 font-bold bg-indigo-200 text-blue-500 rounded-xl`}>100%</Text>
      </View>
    </View>
  );
};

export default VideoDetailScreen;
