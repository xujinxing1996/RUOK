import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import { COURSES } from '../data/dummy-data';

const FreeCourseScreen = ({ navigation, route }) => {
  const { isFree } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: isFree ? '免费课程' : '精品课程' });
  }, [navigation]);

  const renderGridItem = (itemData) => {
    return (
      <MoreCourseItem onSelectCourse={() => navigation.navigate('CourseDetail')} />
    );
  };

  return (
    <View style={tw`flex-1 px-3 bg-white`}>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={renderGridItem}
      />
    </View>
  );
};

export default FreeCourseScreen;
