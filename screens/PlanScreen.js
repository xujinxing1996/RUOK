import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';
import * as coursesActions from '../store/actions/courses';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/core';

const PlanScreen = ({ navigation, route }) => {
  const Tab = createMaterialTopTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const courses = useSelector((state) => state.courses.userCourses);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      if (token) {
        setIsLoading(true);
        await dispatch(coursesActions.fetchUserCourses());
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [dispatch])
  );

  if (!token) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>请登录!</Text>
        <Button
          title="登录"
          onPress={() => navigation.navigate('AuthScreen')}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const CourseItem = ({ item }) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version > 21) {
      TouchableCmp = TouchableNativeFeedback;
    }

    return (
      <View style={tw`m-1.5 p-2.5 bg-white rounded-xl`}>
        <TouchableCmp
          onPress={() =>
            navigation.navigate('UserCourseDetail', { courseId: item.classId })
          }
          useForeground
        >
          <View style={tw`flex-row justify-between`}>
            <Image
              style={tw`w-[40%] rounded-xl`}
              resizeMode="stretch"
              source={{ uri: item.classImage }}
            />
            <View style={tw`w-[55%]`}>
              <TitleText titleText={item.className} />
              <View style={tw`flex-row mt-2`}>
                <BaseText style="p-1.5 font-bold bg-indigo-200 text-blue-500 rounded-xl">
                  {item.packagePrice > 0 ? '精品课程' : '免费课程'}
                </BaseText>
              </View>
              <BaseText style="text-gray-500 text-sm">
                {item.beginTime}-{item.endTime}
              </BaseText>
              <BaseText style="text-gray-500">已学20%</BaseText>
            </View>
          </View>
        </TouchableCmp>
      </View>
    );
  };

  const AllScreen = ({ navigation, route }) => {
    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', async (event) => {
        if (route.name === 'All') {
          await dispatch(coursesActions.fetchUserCourses());
        } else if (route.name === 'Undone') {
          await dispatch(coursesActions.fetchUserCourses(0));
        } else {
          await dispatch(coursesActions.fetchUserCourses(1));
        }
      });
      return unsubscribe;
    }, [navigation]);

    return (
      <FlatList
        data={courses}
        keyExtractor={(item) => item.classId}
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
