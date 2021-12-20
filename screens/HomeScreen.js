import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import CourseItem from '../components/course/CourseItem';
import CourseGridItem from '../components/CourseGridItem';
import ListHeader from '../components/ListHeader';
import * as swipersActions from '../store/actions/swipers';
import * as coursesActions from '../store/actions/courses';
import * as teachersActions from '../store/actions/teachers';
import Colors from '../constants/Colors';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const boutiqueCourses = useSelector((state) => state.courses.boutiqueCourses);
  const freeCourses = useSelector((state) => state.courses.freeCourses);
  const swipers = useSelector((state) => state.swipers.swiperImgs);
  const activityImg = useSelector((state) => state.swipers.activityImg);
  const teacherList = useSelector((state) => state.teachers.teacherList);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(swipersActions.fetchSiwpers());
      await dispatch(swipersActions.fetchActivityImg());
      await dispatch(coursesActions.fetchBoutiqueCourses(1, 2));
      await dispatch(coursesActions.fetchFreeCourses(1, 2));
      await dispatch(teachersActions.fetchGetTeachers(1, 3));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadData();
  }, [dispatch, loadData, navigation]);

  if (error) {
    return (
      <View style={tw``}>
        <Text>系统错误</Text>
        <Button title="重试" />
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
    <SafeAreaView>
      <ScrollView>
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`mx-3 mb-3 `}>
            <View style={tw`rounded-xl overflow-hidden`}>
              <Swiper style={tw`h-[170px]`}>
                {swipers &&
                  swipers.map((item, index) => {
                    return (
                      <Image
                        key={item.description + index}
                        testId={item.description}
                        resizeMode="stretch"
                        style={tw`w-full h-[200px]`}
                        source={{
                          uri: item.imageUrl,
                        }}
                      />
                    );
                  })}
              </Swiper>
            </View>
            <View style={tw`m-[10px] flex-row`}>
              <View style={tw`flex-1 items-center`}>
                <Image
                  style={tw`w-[45px] h-[45px]`}
                  source={require('../assets/images/huodong.jpg')}
                />
                <BaseText>活动中心</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Image
                  style={tw`w-[45px] h-[45px]`}
                  source={require('../assets/images/remen.jpg')}
                />
                <BaseText>热门课程</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Image
                  style={tw`w-[45px] h-[45px]`}
                  source={require('../assets/images/teacher.jpg')}
                />
                <BaseText>名师排行</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Image
                  style={tw`w-[45px] h-[45px]`}
                  source={require('../assets/images/qiandao.jpg')}
                />
                <BaseText>签到</BaseText>
              </View>
            </View>
            <View style={tw`rounded-xl overflow-hidden h-[180px]`}>
              <View style={tw`absolute top-2 left-2 z-20 p-1.5 rounded-lg overflow-hidden bg-white`}>
                <Text
                  style={tw`font-bold`}
                >
                  热门活动
                </Text>
              </View>
              <Image
                style={tw`h-full`}
                source={{ uri: activityImg && activityImg[0].imageUrl }}
              />
            </View>
          </View>
          <ListHeader
            title="精品课程"
            onSelect={() => {
              navigation.navigate('FreeCourse', { isFree: false });
            }}
          />
          {boutiqueCourses.slice(0, 2).map((item) => (
            <CourseGridItem
              onSelectCourse={() => {
                navigation.navigate('CourseHomeDetail', {
                  courseId: item.classId,
                });
              }}
              imageUrl={item.classImage}
              key={item.classId}
              title={item.className}
              description={item.courseDescription}
              beginDate={item.beginTime}
              endDate={item.endTime}
            />
          ))}
          <ListHeader
            title="免费课程"
            onSelect={() => {
              navigation.navigate('FreeCourse', { isFree: true });
            }}
          />
          {freeCourses.slice(0, 2).map((item) => (
            <CourseItem
              onSelectCourse={() => {
                navigation.navigate('CourseHomeDetail', {
                  courseId: item.classId,
                });
              }}
              imageUrl={item.classImage}
              key={item.classId}
              title={item.className}
              description={item.courseDescription}
              beginDate={item.beginTime}
              endDate={item.endTime}
            />
          ))}
          <ListHeader
            onSelect={() => {
              navigation.navigate('Teachers');
            }}
            title="名师简介"
          />
          <View style={tw`mx-3`}>
            {teacherList.slice(0, 3).map((item) => (
              <CourseGridItem
                key={item.teacherId}
                imageUrl={item.teacherImage}
                isTeacher={true}
                title={item.teacherName}
                types={item.teacherCourse}
                description={item.teacherDesc}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
