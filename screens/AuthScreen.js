import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { Button, CheckBox, Chip, Text } from "@rneui/themed";
import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';
import * as coursesActions from '../store/actions/courses';
import { getValidCode } from '../store/actions/user';

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
      Alert.alert('????????????', error, [
        {
          text: '??????',
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
      await dispatch(userActions.getUserInfo());
      await dispatch(coursesActions.fetchMyCoursesId());
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

  const handleClickCode = async () => {
    if (formState.inputValues.phoneNumber.trim().length === 0) {
      Alert.alert('????????????', '?????????????????????', [
        {
          text: '??????',
        },
      ]);
      return;
    }
    const resData = await getValidCode(formState.inputValues.phoneNumber);
    if (resData.code === 500) {
      Alert.alert('????????????', resData.msg, [
        {
          text: '??????',
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
      required
      secureTextEntry={true}
      placeholder="???????????????"
      errorText="???????????????"
      autoCapitalize="none"
      r
      onInputChange={handleChangeText}
    />
  );
  if (!isLogin) {
    PasswordCmp = (
      <View style={tw`flex-row justify-center items-center`}>
        <View style={tw`flex-1`}>
          <Input
            id="password"
            initialValue=""
            required
            placeholder="??????????????????"
            errorText="??????????????????"
            onInputChange={handleChangeText}
          />
        </View>
        <View style={tw`flex-1`}>
          <Button
            type="clear"
            title={codeBtnIsDisable ? `${codeTimeNum}????????????` : '???????????????'}
            disabled={codeBtnIsDisable}
            onPress={handleClickCode}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 items-center bg-white`}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={50}
    >
      <Text style={tw`py-10`} h4>
        {isLogin ? '??????????????????' : '???????????????'}
      </Text>
      <View style={tw`w-4/5`}>
        <Input
          id="phoneNumber"
          // label="?????????"
          keyboardType="phone-pad"
          initialValue=""
          required
          placeholder="??????????????????"
          errorText="??????????????????"
          onInputChange={handleChangeText}
        />
        {PasswordCmp}
        <View style={tw`self-start`}>
          <Button
            type="clear"
            title={isLogin ? '???????????????' : '????????????'}
            titleStyle={tw`text-sm`}
            color={Colors.accent}
            onPress={() => setIsLogin((prevState) => !prevState)}
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Chip title="??????" color={Colors.primary} onPress={handleAuth} />
          )}
        </View>
        <View style={tw`mt-5 text-sm flex-row justify-start items-center`}>
          <CheckBox
            containerStyle={{
              backgroundColor: '#fff',
              borderWidth: 0,
              padding: 0,
              margin: 0,
            }}
            title="??????????????????"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={true}
          />
          <Text style={{ margin: 0, color: 'blue' }}>
            ????????????????????????????????????
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
