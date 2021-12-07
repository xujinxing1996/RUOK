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
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '全部',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IonicsHeaderButton}>
              <Item title="Ellipses" iconName="ios-chatbox-ellipses" />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen name="FreeCourse" component={FreeCourseScreen} />
      <Stack.Screen
        name="Teachers"
        component={TeacherScreen}
        options={{ title: '名师简介' }}
      />
      <Stack.Screen
        name="CourseHomeDetail"
        component={CourseDetail}
        options={{ title: '课程详情' }}
      />
      <Stack.Screen
        name="HomeVideoDetail"
        component={VideoDetailScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

const CoursesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false }}
    >
      <Stack.Screen
        name="Course"
        component={CoursesScreen}
        options={{ title: '课程' }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ title: '课程详情' }}
      />
      <Stack.Screen
        name="CourseVideoDetail"
        component={VideoDetailScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

const UserCoursesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false }}
    >
      <Stack.Screen
        name="UserCourses"
        component={PlanScreen}
        options={{ title: '我的课程' }}
      />
      <Stack.Screen
        name="UserCourseDetail"
        component={CourseDetail}
        options={{ title: '课程详情' }}
      />
      <Stack.Screen
        name="UserVideoDetail"
        component={VideoDetailScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ title: '登录' }}
      />
    </Stack.Navigator>
  );
};

const UserInfoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false }}
    >
      <Stack.Screen
        name="UserInfo"
        component={UserScreen}
        options={{
          title: '我的',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IonicsHeaderButton}>
              <Item title="Ellipses" iconName="ios-chatbox-ellipses" />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ title: '设置' }}
      />
      <Stack.Screen
        name="UserAuthScreen"
        component={AuthScreen}
        options={{ title: '登录' }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const CourseTabNavigator = () => {
  return (
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
        name="CourseScreen"
        component={CoursesNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '课程',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-reader" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PlanScreen"
        component={UserCoursesNavigator}
        options={{
          title: '我的课程',
          headerShown: false,
          tabBarLabel: '学习',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserInfoNavigator}
        options={{
          title: '我的',
          headerShown: false,
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
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartUp" component={StartupScreen} />
        <Stack.Screen name="Main" component={CourseTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
