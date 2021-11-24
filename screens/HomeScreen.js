import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import CourseGridItem from '../components/CourseGridItem';
import ListHeader from '../components/ListHeader';
import { COURSES, TEACHERS } from '../data/dummy-data';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`m-3`}>
            <View style={tw`bg-blue-500 rounded-xl h-[180px]`}></View>
            <View style={tw`m-[10px] flex-row`}>
              <View style={tw`flex-1 items-center`}>
                <BaseText>活动中心</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <BaseText>热门课程</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <BaseText>名师排行</BaseText>
              </View>
              <View style={tw`flex-1 items-center`}>
                <BaseText>签到</BaseText>
              </View>
            </View>
            <View style={tw`bg-red-900 rounded-xl h-[180px]`}></View>
          </View>
          <ListHeader
            title="精品课程"
            onSelect={() => {
              navigation.navigate('FreeCourse', { isFree: false });
            }}
          />
          <View style={tw`mx-3 mt-3`}>
            {COURSES.map((item) => (
              <CourseGridItem
                onSelectCourse={() => {
                  navigation.navigate('CourseDetail');
                }}
                key={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
          </View>
          <ListHeader
            title="免费课程"
            onSelect={() => {
              navigation.navigate('FreeCourse', { isFree: true });
            }}
          />
          <View style={tw`mx-3 mt-3`}>
            {COURSES.map((item) => (
              <CourseGridItem
                onSelectCourse={() => {
                  navigation.navigate('CourseDetail');
                }}
                key={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
          </View>
          <ListHeader onSelect={() => {
            navigation.navigate('Teachers')
          }} title="名师简介" />
          <View style={tw`m-3`}>
            {TEACHERS.map((item) => (
              <CourseGridItem
                key={item.id}
                isTeacher={true}
                title={item.title}
                types={item.types}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
