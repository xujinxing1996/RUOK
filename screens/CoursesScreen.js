import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import { COURSES } from '../data/dummy-data';

const CoursesScreen = ({ navigation }) => {
  const renderGridItem = () => {
    return (
      <MoreCourseItem
        onSelectCourse={() => navigation.navigate('CourseDetail')}
      />
    );
  };

  return (
    <FlatList
      style={tw`flex-1 px-3 bg-white`}
      data={COURSES}
      keyExtractor={(item) => item.id}
      renderItem={renderGridItem}
    />
  );
};

export default CoursesScreen;
