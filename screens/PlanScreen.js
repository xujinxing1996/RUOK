import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import * as coursesActions from '../store/actions/courses';
import Colors from '../constants/Colors';
import { Chip } from '@rneui/themed';
import PlanCoursesOutput from '../components/PlanCoursesOutput/PlanCoursesOutput';

const PlanCoursesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.userCourses);
  useEffect(() => {
    dispatch(coursesActions.fetchUserCourses());
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      console.log(`route.name`, route.name);
      if (route.name === 'Undone') {
        dispatch(coursesActions.fetchUserCourses(0));
      } else {
        dispatch(coursesActions.fetchUserCourses(1));
      }
    });
  
    return unsubscribe;
    
  }, [navigation]);

  return <PlanCoursesOutput courses={courses} />;
};

const PlanScreen = ({ navigation, route }) => {
  const Tab = createMaterialTopTabNavigator();
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          style={{ width: 200, height: 200, marginBottom: 20 }}
          source={require('../assets/images/login-bg.png')}
        />
        <Text style={{ color: 'gray', marginBottom: 50 }}>
          请登录后再继续学习哦~~
        </Text>
        <View style={{ width: 160 }}>
          <Chip
            style={tw`w-full`}
            title="登录"
            onPress={() => navigation.navigate('AuthScreen')}
            color={Colors.primary}
          />
        </View>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All"
        component={PlanCoursesScreen}
        options={{ title: '全部' }}
      />
      <Tab.Screen
        name="Undone"
        component={PlanCoursesScreen}
        options={{ title: '未完成' }}
      />
      <Tab.Screen
        name="Completed"
        component={PlanCoursesScreen}
        options={{ title: '已完成' }}
      />
    </Tab.Navigator>
  );
};

export default PlanScreen;
