import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabView, Button } from 'react-native-elements';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import TitleText from '../components/TitleText';
import * as coursesActions from '../store/actions/courses';
import Colors from '../constants/Colors';
import ListAccordion from '../components/ListAccordion';
import { Ionicons } from '@expo/vector-icons';

const CourseDetail = ({ navigation, route }) => {
  const { courseId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const selectedCourse = useSelector((state) => state.courses.courseInfo);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(coursesActions.fetchDetailCourse(courseId));
    setIsLoading(false);
  }, [dispatch]);

  const handleStartStudy = () => {
    if (route.name === 'CourseHomeDetail') {
      navigation.navigate('HomeVideoDetail');
    } else if (route.name === 'CourseDetail') {
      navigation.navigate('CourseVideoDetail');
    } else if (route.name === 'UserCourseDetail') {
      navigation.navigate('UserVideoDetail');
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
        <ScrollView style={tw`bg-white`}>
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
            <Ionicons style={tw`mr-1`} name="checkmark-circle-outline" color="green" size={20} />
            <BaseText style="mr-6 text-gray-400">报考指导</BaseText>
            <Ionicons style={tw`mr-1`} name="checkmark-circle-outline" color="green" size={20} />
            <BaseText style="text-gray-400">名师教学</BaseText>
          </View>
          <View style={tw`p-4 flex-row text-gray-400 border-b border-gray-300`}>
            <BaseText style="mr-6 text-gray-400">课程保障</BaseText>
            {selectedCourse.courseGuarantee.map((item, index) => (
              <>
              <Ionicons key={index} style={tw`mr-1`} name="checkmark-circle-outline" color="green" size={20} />
              <BaseText key={item} style="mr-6 text-gray-400">
                {item}
              </BaseText>
              </>
            ))}
          </View>
          <View style={tw`h-[9px] bg-gray-100`}></View>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={{ backgroundColor: Colors.primary }}
          >
            <Tab.Item
              titleStyle={{ color: index === 0 ? Colors.primary : '#000' }}
              containerStyle={{ backgroundColor: '#fff' }}
              title="课程概述"
            />
            <Tab.Item
              titleStyle={{ color: index === 1 ? Colors.primary : '#000' }}
              containerStyle={{ backgroundColor: '#fff' }}
              title="课程大纲"
            />
          </Tab>

          <TabView value={index} onChange={setIndex}>
            <TabView.Item>
              <View style={tw`p-3 flex-1 justify-between items-center`}>
                <BaseText>
                  {selectedCourse.courseDescription || '无内容'}
                </BaseText>
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
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  onPress={handleStartStudy}
                />
              </View>
            </TabView.Item>
            <TabView.Item>
              <View style={tw`p-3 flex-1 justify-between items-center`}>
                <View style={tw`w-full`}>
                  {selectedCourse.catalogueList.map((video) => {
                    return (
                      <ListAccordion key={video.catalogueId} video={video} />
                    );
                  })}
                </View>
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
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  onPress={handleStartStudy}
                />
              </View>
            </TabView.Item>
          </TabView>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default CourseDetail;
