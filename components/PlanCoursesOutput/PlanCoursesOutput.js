import React from 'react'
import { FlatList } from 'react-native';
import CourseItem from './CourseItem';

function renderCourseItem(itemData) {
  return <CourseItem {...itemData.item} />;
}

function PlanCoursesOutput({ courses }) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.classId}
      renderItem={renderCourseItem}
    />
  );
}

export default PlanCoursesOutput;
