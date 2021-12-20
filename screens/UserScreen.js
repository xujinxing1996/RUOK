import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Button,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import BaseText from '../components/BaseText';
import * as userActions from '../store/actions/user';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/core';
import { Chip } from 'react-native-elements';

const UserScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      if (token) {
        setIsLoading(true);
        await dispatch(userActions.getUserInfo());
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useFocusEffect(useCallback(() => {
    loadData();
  }, [dispatch]));

  // useEffect(() => {
  //   loadData();
  // }, [navigation, dispatch, route.name]);

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
            onPress={() => navigation.navigate('UserAuthScreen')}
            color={Colors.primary}
          />
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`flex-row items-center mx-10 mb-4`}>
        <View
          style={tw`rounded-full bg-purple-200 h-15 w-15 items-center justify-center mr-4`}
        >
          {userInfo && userInfo.avatar ? (
            <Image style={tw`w-15 h-15`} source={{ uri: userInfo.avatar }} />
          ) : (
            <Ionicons name="ios-person" size={35} color="purple" />
          )}
        </View>
        <View>
          <BaseText>{userInfo && userInfo.realName}</BaseText>
          <BaseText>{userInfo && userInfo.phonenumber}</BaseText>
        </View>
      </View>
      <View style={tw`rounded-full mx-8 h-12`}>
        <Image
          resizeMode="stretch"
          style={tw`w-full h-full`}
          source={require('../assets/images/user-banner.png')}
        />
      </View>
      <View style={tw`h-[9px] my-4 bg-gray-100`}></View>
      <View>
        <View
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-clipboard" size={20} />
            <BaseText style="ml-3 font-bold">我的资料</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </View>
        <Pressable
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-layers" size={20} />
            <BaseText style="ml-3 font-bold">设置</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </Pressable>
        <View
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-mail" size={20} />
            <BaseText style="ml-3 font-bold">意见反馈</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-map" size={20} />
            <BaseText style="ml-3 font-bold">课程协议</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-200 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-information-circle" size={20} />
            <BaseText style="ml-3 font-bold">关于我们</BaseText>
          </View>
          <Ionicons name="ios-chevron-forward" color="gray" size={20} />
        </View>
      </View>
    </View>
  );
};

export default UserScreen;
