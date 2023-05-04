import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { Chip } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import BaseText from '../components/BaseText';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';
import { SET_MY_COURSES_ID } from '../store/actions/courses';
import API_URL from '../constants/Config';

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});

const SettingScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(userActions.resetUserInfo());
    dispatch({ type: SET_MY_COURSES_ID, products: [] });
    navigation.navigate('UserInfo');
  };

  const handleDeleteAccount = async () => {
    const response = await fetch(`${API_URL}/system/user/deleteSelf`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) {
      throw new Error('请求错误');
    }
    const resData = await response.json();
    if (resData.code === 500) {
      Alert.alert('错误', resData.msg, [
        {
          text: '确认',
        },
      ]);
    } else {
      handleLogout();
    }
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
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() =>
            Alert.alert('提示', '确定要删除当前账户吗？', [
              { text: '确认', onPress: handleDeleteAccount },
              { text: '取消', onPress: () => {} },
            ])
          }
        >
          <View
            style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
          >
            <View style={tw`flex-row flex-1 justify-between mr-4`}>
              <BaseText style="ml-3 font-bold">删除账户</BaseText>
            </View>
            <Ionicons name="ios-chevron-forward" color="gray" size={20} />
          </View>
        </Pressable>
      </View>
      <View style={tw`mx-2`}>
        <Chip title="退出登录" color={Colors.primary} onPress={handleLogout} />
      </View>
    </View>
  );
};

export default SettingScreen;
