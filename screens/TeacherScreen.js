import React from 'react';
import { FlatList, View, Text } from 'react-native';
import tw from 'twrnc';
import TitleText from '../components/TitleText';
import { TEACHERS } from '../data/dummy-data';

const TeacherScreen = ({ navigation }) => {
  const TeacherItem = ({ item }) => {
    return (
      <View
        style={tw`p-5 m-2 rounded-xl border border-gray-400 flex-row justify-between`}
      >
        <View style={tw`w-[40%] bg-blue-500 h-[90%] rounded-xl`}></View>
        <View style={tw`w-[50%]`}>
          <Text style={tw.style({ fontFamily: 'NotoSansSc-Bold' })}>
            {item.title}
          </Text>
          <Text style={tw`text-gray-500 my-2`}>{item.types}</Text>
          <Text style={tw`text-gray-500`} numberOfLines={4}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={TEACHERS}
      renderItem={TeacherItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TeacherScreen;
