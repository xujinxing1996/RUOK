import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View } from 'react-native';
import tw from 'twrnc';
import CourseTabNavigator from './navigation/Navigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'NotoSansSc-Bold': require('./assets/fonts/NotoSansSC-Bold.otf'),
    'NotoSansSc-Regular': require('./assets/fonts/NotoSansSC-Regular.otf'),
  });
};

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
    <View style={tw`flex-1`}>
      <CourseTabNavigator />
    </View>
  );
}
