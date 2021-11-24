import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Button } from 'react-native';
import tw from 'twrnc';
import TitleText from '../components/TitleText';

const CourseDetail = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`m-4`}>
          <View style={tw`bg-blue-500 rounded-xl h-[200px]`}></View>
          <TitleText titleText="一级理论精讲班 一级建造师-理论" />
          <View style={tw`flex-row`}>
            <Text style={tw`p-2 text-yellow-600 border-yellow-600 border mr-2`}>
              教材精讲
            </Text>
            <Text style={tw`p-2 text-yellow-600 border-yellow-600 border`}>
              夯实基础
            </Text>
          </View>
          <Text style={tw`text-gray-400 mt-3`}>主讲人:金亮、宿吉南</Text>
        </View>
        <View style={tw`h-[9px] bg-gray-200`}></View>
        <View style={tw`p-4 flex-row border-b border-gray-300`}>
          <Text style={tw`mr-6`}>特色服务</Text>
          <Text style={tw`mr-6`}>报考指导</Text>
          <Text>名师教学</Text>
        </View>
        <View style={tw`p-4 flex-row border-b border-gray-300`}>
          <Text style={tw`mr-6`}>课程保障</Text>
          <Text style={tw`mr-6`}>核心串讲</Text>
          <Text>核心串讲</Text>
        </View>
        <View style={tw`h-[9px] bg-gray-200`}></View>
        <View style={tw`p-3 border-b border-gray-300`}>
          <Text>课程概述</Text>
        </View>
        <View style={tw`p-3`}>
          <Text>
            一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级一级: 高级课程二级
          </Text>
        </View>
        <View style={tw`rounded-xl my-7 items-center`}>
          <Button onPress={() => navigation.navigate('VideoDetail')} title="开始学习" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetail;
