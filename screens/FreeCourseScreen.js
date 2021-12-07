import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';

const FreeCourseScreen = ({ navigation, route }) => {
  const { isFree } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const freeCourses = useSelector((state) => state.courses.freeCourses);
  const boutiqueCourses = useSelector((state) => state.courses.boutiqueCourses);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      if (isFree) {
        await dispatch(coursesAction.fetchFreeCourses(1, 5));
      } else {
        await dispatch(coursesAction.fetchBoutiqueCourses(1, 5));
      }
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(async () => {
    navigation.setOptions({ title: isFree ? '免费课程' : '精品课程' });
    setIsLoading(true);
    await loadData()
    setIsLoading(false);
  }, [dispatch, loadData, navigation]);

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

  // useLayoutEffect(() => {
  //   navigation.setOptions({ title: isFree ? '免费课程' : '精品课程' });
  // }, [navigation]);

  const renderGridItem = ({ item }) => {
    return (
      <MoreCourseItem
        imageUrl={item.classImage}
        title={item.className}
        description={item.courseDescription}
        onSelectCourse={() =>
          navigation.navigate('CourseDetail', { courseId: item.classId })
        }
      />
    );
  };

  return (
    <FlatList
      style={tw`flex-1 px-3 bg-white`}
      refreshing={isRefreshing}
      onRefresh={loadData}
      data={isFree ? freeCourses : boutiqueCourses}
      keyExtractor={(item) => item.classId}
      renderItem={renderGridItem}
    />
  );
};

export default FreeCourseScreen;
