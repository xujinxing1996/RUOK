import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TooltipMessage from '../components/TooltipMessage';
import Colors from '../constants/Colors';
import * as teachersAction from '../store/actions/teachers';

const TeacherScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const teachers = useSelector((state) => state.teachers.teacherList);
  const dispatch = useDispatch();

  const loadData = async () => {
    await dispatch(teachersAction.fetchGetTeachers(1, 5));
  };

  useEffect(async () => {
    setIsLoading(true);
    await loadData();
    setIsLoading(false);
  }, [dispatch, navigation]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const TeacherItem = ({ item }) => {
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
          <BaseText style="text-gray-500" numberOfLines={4}>
            {item.teacherDesc}
          </BaseText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={tw`bg-white`}
      data={teachers}
      refreshing={isRefreshing}
      onRefresh={loadData}
      renderItem={({ item }) => <TooltipMessage item={item} />}
      keyExtractor={(item) => item.teacherId}
    />
  );
};

export default TeacherScreen;
