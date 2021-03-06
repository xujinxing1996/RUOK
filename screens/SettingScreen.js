import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, Button } from 'react-native';
import { Chip } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';
import { SET_MY_COURSES_ID } from '../store/actions/courses';

const SettingScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(userActions.resetUserInfo());
    dispatch({ type: SET_MY_COURSES_ID, products: [] });
    navigation.navigate('UserInfo');
  };

  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`mb-5`}>
        <Pressable
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row flex-1 justify-between mr-4`}>
            <BaseText style="ml-3 font-bold">手机号</BaseText>
            <BaseText style="ml-3 font-bold">{userInfo?.phonenumber}</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </Pressable>
        <Pressable
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row flex-1 justify-between mr-4`}>
            <BaseText style="ml-3 font-bold">修改密码</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </Pressable>
      </View>
      <View style={tw`mx-2`}>
        <Chip title="退出登录" color={Colors.primary} onPress={handleLogout} />
      </View>
    </View>
  );
};

export default SettingScreen;
