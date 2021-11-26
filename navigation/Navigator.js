import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CourseDetail from '../screens/CourseDetailScreen';
import FreeCourseScreen from '../screens/FreeCourseScreen';
import HomeScreen from '../screens/HomeScreen';
import TeacherScreen from '../screens/TeacherScreen';
import PlanScreen from '../screens/PlanScreen';
import UserScreen from '../screens/UserScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import CoursesScreen from '../screens/CoursesScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IonicsHeaderButton from '../components/IonicsHeaderButton';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IonicsHeaderButton}>
        <Item title="Ellipses" iconName="ios-chatbox-ellipses" />
      </HeaderButtons>
    ), }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '全部' }}
      />
      <Stack.Screen name="FreeCourse" component={FreeCourseScreen} />
      <Stack.Screen
        name="Teachers"
        component={TeacherScreen}
        options={{ title: '名师简介' }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ title: '课程详情' }}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetailScreen}
        options={{ title: '课程名称', }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const CourseTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: '#3b82f6',
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Course"
          component={CoursesScreen}
          options={{
            title: '课程',
            tabBarLabel: '课程',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-reader" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PlanScreen"
          component={PlanScreen}
          options={{
            title: '我的课程',
            tabBarLabel: '学习',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-book" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="UserScreen"
          component={UserScreen}
          options={{
            title: '我的',
            tabBarLabel: '我的',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={IonicsHeaderButton}>
                <Item title="Ellipses" iconName="ios-chatbox-ellipses" />
              </HeaderButtons>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default CourseTabNavigator;
