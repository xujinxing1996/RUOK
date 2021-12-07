import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
let timer = null;

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    default:
      return state;
  }
};

const AuthScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [codeBtnIsDisable, setCodeBtnIsDisable] = useState(false);
  const [codeTimeNum, setCodeTimeNum] = useState(0);
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      phoneNumber: '',
      password: '',
    },
    inputValidities: {
      phoneNumber: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (codeTimeNum === 60) {
      timer = setInterval(() => {
        setCodeTimeNum((prevState) => --prevState);
      }, 1000);
    } else if (timer && codeTimeNum === 0) {
      setCodeBtnIsDisable(false);
      clearInterval(timer);
    }
    return timer;
  }, [codeTimeNum]);

  useEffect(() => {
    if (error) {
      Alert.alert('登录失败', error, [
        {
          text: '确认',
        },
      ]);
    }
  }, [error]);

  const handleChangeText = useCallback(
    (id, isValid, value) => {
      formDispatch({
        type: FORM_INPUT_UPDATE,
        input: id,
        isValid,
        value,
      });
    },
    [formDispatch]
  );

  const handleAuth = async () => {
    if (!formState.formIsValid) {
      Alert.alert('提示', '请输入用户名和密码', [
        {
          text: '确认',
        },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.phoneNumber,
          formState.inputValues.password,
          isLogin
        )
      );
      if (route.name === 'UserAuthScreen') {
        navigation.navigate('UserInfo');
      } else {
        navigation.navigate('UserCourses');
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleClickCode = () => {
    if (formState.inputValues.phoneNumber.trim().length === 0) {
      Alert.alert('错误提示', '请输入手机号码', [
        {
          text: '确认',
        },
      ]);
      return;
    }
    setCodeBtnIsDisable(true);
    setCodeTimeNum(60);
  };

  let PasswordCmp = (
    <Input
      id="password"
      label="密码"
      required
      errorText="请输入密码"
      autoCapitalize="none"
r      onInputChange={handleChangeText}
    />
  );
  if (!isLogin) {
    PasswordCmp = (
      <View style={tw`flex-row items-center`}>
        <Input
          id="password"
          label="验证码"
          initialValue=""
          required
          errorText="请输入验证码"
          onInputChange={handleChangeText}
        />
        <Button
          title={codeBtnIsDisable ? `${codeTimeNum}秒后重试` : '获取验证码'}
          disabled={codeBtnIsDisable}
          onPress={handleClickCode}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={50}
    >
      <LinearGradient
        colors={['#3B82F6', '#3B82a3']}
        style={tw`flex-1 justify-center items-center`}
      >
        <Card style={tw`w-[80%] max-w-[400px] max-h-[400] p-[20px]`}>
          <ScrollView>
            <Input
              id="phoneNumber"
              label="用户名"
              keyboardType="phone-pad"
              initialValue=""
              required
              errorText="请输入用户名"
              onInputChange={handleChangeText}
            />
            {PasswordCmp}
            <View style={tw`mt-[10px]`}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title="登录"
                  color={Colors.primary}
                  onPress={handleAuth}
                />
              )}
            </View>
            <View style={tw`mt-[10px]`}>
              <Button
                title={isLogin ? '验证码登录' : '密码登录'}
                color={Colors.accent}
                onPress={() => setIsLogin((prevState) => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
