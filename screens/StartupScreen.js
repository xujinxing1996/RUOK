import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { TOKEN } from '../constants/Auth';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';
import * as coursesActions from '../store/actions/courses';

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const token = await AsyncStorageLib.getItem(TOKEN);
        if (token) {
          await dispatch(authActions.authenticate(token));
          await dispatch(userActions.getUserInfo());
          await dispatch(coursesActions.fetchMyCoursesId());
        }
        navigation.navigate('Main');
      } catch (error) {
        console.log('error', error);
      }
    };
    tryLogin();
  }, [navigation, dispatch]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;
