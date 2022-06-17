import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from '@rneui/themed';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';
import * as coursesActions from '../store/actions/courses';
import Colors from '../constants/Colors';
import ListAccordion from '../components/ListAccordion';
import { Ionicons } from '@expo/vector-icons';
import { commonStyle } from '../styles';

const CourseDetail = ({ navigation, route }) => {
  const { courseId, isFree } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const selectedCourse = useSelector((state) => state.courses.courseInfo);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(coursesActions.fetchDetailCourse(courseId));
    setIsLoading(false);
  }, [dispatch]);

  const handleStartStudy = () => {
    if (route.name === 'CourseHomeDetail') {
      navigation.navigate('HomeVideoDetail', { isFree });
    } else if (route.name === 'CourseDetail') {
      navigation.navigate('CourseVideoDetail', { isFree });
    } else if (route.name === 'UserCourseDetail') {
      navigation.navigate('UserVideoDetail', { isFree });
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
      <SafeAreaView style={commonStyle.safeArea}>
        <ScrollView style={tw`flex-1 bg-white`}>
          <View style={tw`m-4`}>
            <Image
              resizeMode="stretch"
              style={tw`w-full h-[200px] rounded-xl mb-3`}
              source={{ uri: selectedCourse.classImage }}
            />
            <TitleText
              titleText={`【${selectedCourse.className}】 ${selectedCourse.projectName}-${selectedCourse.subjectName}`}
            />
            <View style={tw`flex-row my-3`}>
              {selectedCourse.tags.map((tag) => (
                <BaseText
                  key={tag}
                  style="p-0.5 text-xs text-yellow-600 border-yellow-600 border mr-2"
                >
                  {tag}
                </BaseText>
              ))}
            </View>
            <BaseText style="text-gray-400">
              主讲人:{selectedCourse.mainTeacher}
            </BaseText>
          </View>
          <View style={tw`h-[9px] bg-gray-100`}></View>
          <View style={tw`p-4 flex-row border-b border-gray-300`}>
            <BaseText style="mr-6 text-gray-400">特色服务</BaseText>
            <Ionicons
              style={tw`mr-1`}
              name="checkmark-circle-outline"
              color="green"
              size={20}
            />
            <BaseText style="mr-6 text-gray-400">报考指导</BaseText>
            <Ionicons
              style={tw`mr-1`}
              name="checkmark-circle-outline"
              color="green"
              size={20}
            />
            <BaseText style="text-gray-400">名师教学</BaseText>
          </View>
          <View style={tw`p-4 flex-row border-b border-gray-300`}>
            <BaseText style="mr-6 text-gray-400">课程保障</BaseText>
            {selectedCourse.courseGuarantee.map((item, index) => (
              <View style={tw`flex-row`} key={index}>
                <Ionicons
                  style={tw`mr-1`}
                  name="checkmark-circle-outline"
                  color="green"
                  size={20}
                />
                <BaseText style="mr-6 text-gray-400">{item}</BaseText>
              </View>
            ))}
          </View>
          <View style={tw`h-[9px] bg-gray-100`}></View>
          <Card
            containerStyle={{
              margin: 0,
              padding: 0,
              paddingVertical: 10,
              borderWidth: 0,
            }}
          >
            <Card.Title style={{ marginTop: 15 }}>课程概述</Card.Title>
            <View style={tw`px-5`}>
              <BaseText>
                {selectedCourse.courseDescription || '无内容'}
              </BaseText>
            </View>
          </Card>
          <Card
            containerStyle={{
              margin: 0,
              padding: 0,
              paddingVertical: 10,
              borderWidth: 0,
            }}
          >
            <Card.Title style={{ marginTop: 15 }}>课程大纲</Card.Title>
            <View style={tw`px-5`}>
              {selectedCourse.catalogueList?.map((video) => {
                return <ListAccordion key={video.catalogueId} video={video} />;
              })}
            </View>
          </Card>
          <Button
            title="开始学习"
            buttonStyle={{
              backgroundColor: 'rgba(90, 154, 230, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              alignSelf: 'center',
              marginVertical: 10,
            }}
            onPress={handleStartStudy}
          />
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default CourseDetail;
