import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View } from 'react-native';
import tw from 'twrnc';
import CourseTabNavigator from './navigation/Navigator';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import coursesReducer from './store/reducers/courses';
import swipersReducer from './store/reducers/swipers';
import teachersReducer from './store/reducers/teachers';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';

const fetchFonts = () => {
  return Font.loadAsync({
    'NotoSansSc-Bold': require('./assets/fonts/NotoSansSC-Bold.otf'),
    'NotoSansSc-Regular': require('./assets/fonts/NotoSansSC-Regular.otf'),
  });
};

const rootReducer = combineReducers({
  courses: coursesReducer,
  swipers: swipersReducer,
  teachers: teachersReducer,
  auth: authReducer,
  user: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={tw`flex-1`}>
        <CourseTabNavigator />
      </View>
    </Provider>
  );
}
