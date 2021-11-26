import React from 'react';
import { FlatList, View, Text } from 'react-native';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';
import { TEACHERS } from '../data/dummy-data';

const TeacherScreen = ({ navigation }) => {
  const TeacherItem = ({ item }) => {
    return (
      <View
        style={tw`p-5 m-2 rounded-xl border border-gray-400 flex-row justify-between`}
      >
        <View style={tw`w-[40%] bg-blue-500 h-full rounded-xl`}></View>
        <View style={tw`w-[50%]`}>
          <Text style={tw.style('text-sm', { fontFamily: 'NotoSansSc-Bold' })}>
            {item.title}
          </Text>
          <BaseText style="text-gray-500 my-2">{item.types}</BaseText>
          <BaseText style="text-gray-500" numberOfLines={4}>{item.description}</BaseText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={tw`bg-white`}
      data={TEACHERS}
      renderItem={TeacherItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TeacherScreen;
