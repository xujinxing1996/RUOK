import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import tw from 'twrnc';
import TitleText from '../components/TitleText';
import { COURSES } from '../data/dummy-data';

const PlanScreen = (props) => {
  const Tab = createMaterialTopTabNavigator();

  const AllScreen = () => {
    const CourseItem = ({ item }) => {
      return (
        <View style={tw`m-3 p-3 bg-white rounded-xl flex-row justify-between`}>
          <View style={tw`bg-blue-500 w-[40%] rounded-xl`} />
          <View style={tw`w-[55%]`}>
            <TitleText titleText={item.title} />
            <View style={tw`flex-row`}>
              <Text style={tw`p-2 font-bold bg-indigo-200 text-blue-500 rounded-xl`}>
                精品课程
              </Text>
            </View>
            <Text style={tw`text-gray-500`}>2021.01.01-2021.12.21</Text>
            <Text style={tw`text-gray-500`}>已学20%</Text>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={CourseItem}
      />
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All"
        component={AllScreen}
        options={{ title: '全部' }}
      />
      <Tab.Screen
        name="Undone"
        component={AllScreen}
        options={{ title: '未完成' }}
      />
      <Tab.Screen
        name="Completed"
        component={AllScreen}
        options={{ title: '已完成' }}
      />
    </Tab.Navigator>
  );
};

export default PlanScreen;
