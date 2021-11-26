import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Button } from 'react-native';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';

const CourseDetail = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`m-4`}>
          <View style={tw`bg-blue-500 rounded-xl h-[200px] mb-3`}></View>
          <TitleText titleText="一级理论精讲班 一级建造师-理论" />
          <View style={tw`flex-row my-3`}>
            <BaseText style="p-1 text-yellow-600 border-yellow-600 border mr-2">
              教材精讲
            </BaseText>
            <BaseText style="p-1 text-yellow-600 border-yellow-600 border">
              夯实基础
            </BaseText>
          </View>
          <BaseText style="text-gray-400">主讲人:金亮、宿吉南</BaseText>
        </View>
        <View style={tw`h-[9px] bg-gray-200`}></View>
        <View style={tw`p-4 flex-row border-b border-gray-300`}>
          <BaseText style="mr-6">特色服务</BaseText>
          <BaseText style="mr-6">报考指导</BaseText>
          <BaseText>名师教学</BaseText>
        </View>
        <View style={tw`p-4 flex-row border-b border-gray-300`}>
          <BaseText style="mr-6">课程保障</BaseText>
          <BaseText style="mr-6">核心串讲</BaseText>
          <BaseText>核心串讲</BaseText>
        </View>
        <View style={tw`h-[9px] bg-gray-200`}></View>
        <View style={tw`p-3 border-b border-gray-300`}>
          <BaseText>课程概述</BaseText>
        </View>
        <View style={tw`p-3`}>
          <BaseText>
            一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级
          </BaseText>
        </View>
        <View style={tw`rounded-xl my-7 items-center`}>
          <Button onPress={() => navigation.navigate('VideoDetail')} title="开始学习" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetail;
