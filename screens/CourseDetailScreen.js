import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';
import * as coursesActions from '../store/actions/courses';
import Colors from '../constants/Colors';

const CourseDetail = ({ navigation, route }) => {
  const { courseId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const selectedCourse = useSelector((state) => state.courses.courseInfo);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(coursesActions.fetchDetailCourse(courseId));
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  const handleStartStudy = () => {
    if (route.name === 'CourseHomeDetail') {
      navigation.navigate('HomeVideoDetail')
    } else if (route.name === 'CourseDetail') {
      navigation.navigate('CourseVideoDetail')
    } else if (route.name === 'UserCourseDetail') {
      navigation.navigate('UserVideoDetail')
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch, loadData]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    selectedCourse && (
      <SafeAreaView>
        <ScrollView>
          <View style={tw`m-4`}>
            <Image
              resizeMode="stretch"
              style={tw`w-full h-[200px] rounded-xl mb-3`}
              source={{ uri: selectedCourse.classImage }}
            />
            {/* <View style={tw`bg-blue-500 rounded-xl h-[200px] mb-3`}></View> */}
            <TitleText
              titleText={`【${selectedCourse.className}】 ${selectedCourse.projectName}-${selectedCourse.subjectName}`}
            />
            <View style={tw`flex-row my-3`}>
              {selectedCourse.tags.map((tag) => (
                <BaseText
                  key={tag}
                  style="p-1 text-yellow-600 border-yellow-600 border mr-2"
                >
                  {tag}
                </BaseText>
              ))}
              {/* <BaseText style="p-1 text-yellow-600 border-yellow-600 border mr-2">
                教材精讲
              </BaseText>
              <BaseText style="p-1 text-yellow-600 border-yellow-600 border">
                夯实基础
              </BaseText> */}
            </View>
            <BaseText style="text-gray-400">
              主讲人:{selectedCourse.mainTeacher}
            </BaseText>
          </View>
          <View style={tw`h-[9px] bg-gray-200`}></View>
          <View style={tw`p-4 flex-row border-b border-gray-300`}>
            <BaseText style="mr-6">特色服务</BaseText>
            <BaseText style="mr-6">报考指导</BaseText>
            <BaseText>名师教学</BaseText>
          </View>
          <View style={tw`p-4 flex-row border-b border-gray-300`}>
            <BaseText style="mr-6">课程保障</BaseText>
            {selectedCourse.courseGuarantee.map((item) => (
              <BaseText key={item} style="mr-6">
                {item}
              </BaseText>
            ))}
            {/* <BaseText style="mr-6">核心串讲</BaseText>
            <BaseText>核心串讲</BaseText> */}
          </View>
          <View style={tw`h-[9px] bg-gray-200`}></View>
          <View style={tw`p-3 border-b border-gray-300`}>
            <BaseText>课程概述</BaseText>
          </View>
          <View style={tw`p-3`}>
            <BaseText>{selectedCourse.courseDecription}</BaseText>
          </View>
          <View style={tw`rounded-xl my-7 items-center`}>
            <Button
              onPress={handleStartStudy}
              title="开始学习"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default CourseDetail;
