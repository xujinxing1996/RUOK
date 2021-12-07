import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';

const CoursesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const allCourses = useSelector((state) => state.courses.allCourses);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(coursesAction.fetchGetAllCourses());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadData]);

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>请求错误!</Text>
        <Button title="重试" onPress={loadData} color={Colors.primary} />
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

  return (
    <FlatList
      style={tw`flex-1 px-3 bg-white`}
      refreshing={isRefreshing}
      onRefresh={loadData}
      data={allCourses}
      ListHeaderComponent={
        <Image
          style={tw`h-[200px] w-full`}
          source={require('../assets/images/kecheng.jpg')}
        />
      }
      keyExtractor={(item) => item.classId}
      renderItem={({ item }) => (
        <MoreCourseItem
          imageUrl={item.classImage}
          title={item.className}
          description={item.courseDescription}
          onSelectCourse={() =>
            navigation.navigate('CourseDetail', { courseId: item.classId })
          }
        />
      )}
    />
  );
};

export default CoursesScreen;
