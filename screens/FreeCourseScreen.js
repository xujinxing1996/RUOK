import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';

const selectedItem = {
  title: '项目筛选',
  description: 'Secondary long descriptive text ...',
};

const Dropdown = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  return (
    <RNPickerSelect
      placeholder={{
        label: '请选择项目',
        value: null,
        color: Colors.primary,
      }}
      pickerProps={{
        accessibilityLabel: selectedItem.title,
      }}
      style={{
        ...styles,
        iconContainer: {
          top: 20,
          right: 12,
        },
        placeholder: {
          color: 'purple',
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
      Icon={() => {
        return (
          <View
            style={{
              backgroundColor: 'transparent',
              borderTopWidth: 10,
              borderTopColor: 'gray',
              borderRightWidth: 10,
              borderRightColor: 'transparent',
              borderLeftWidth: 10,
              borderLeftColor: 'transparent',
              width: 0,
              height: 0,
            }}
          />
        );
      }}
      onValueChange={(value) => console.log(value)}
      onDonePress={() => console.log('ios')}
      items={props.options}
    ></RNPickerSelect>
  );
};

const fetchGetFilters = async () => {
  try {
    const response = await fetch(
      'http://121.199.173.63:8007/api/open/interface/getResult',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interfaceCode: 'SI0004',
        }),
      }
    );
    const resData = await response.json();
    return resData.data.map((item) => ({
      label: item.dictName,
      value: item.dictValue,
    }));
  } catch (error) {
    console.log(`error`, error);
  }
};

const FreeCourseScreen = ({ navigation, route }) => {
  const { isFree } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [options, setOptions] = useState([
    { label: 'Latest repositories', value: 'latestRelated' },
    { label: 'Highest rated repositories', value: 'highestRated' },
    { label: 'Lowest rated repositories', value: 'lowestRated' },
  ]);
  const freeCourses = useSelector((state) => state.courses.freeCourses);
  const boutiqueCourses = useSelector((state) => state.courses.boutiqueCourses);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const resData = await fetchGetFilters();
      setOptions(resData);
      if (isFree) {
        await dispatch(coursesAction.fetchFreeCourses(1, 10));
      } else {
        await dispatch(coursesAction.fetchBoutiqueCourses(1, 10));
      }
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(async () => {
    navigation.setOptions({
      title: isFree ? '免费课程' : '精品课程',
      headerBackTitle: '首页',
    });
    setIsLoading(true);
    await loadData();
    setIsLoading(false);
  }, [dispatch, loadData, navigation]);

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>请求错误!</Text>
        <Button title="重试" onPress={loadData} color={Colors.primary} />
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

  const renderGridItem = ({ item }) => {
    return (
      <MoreCourseItem
        imageUrl={item.classImage}
        title={item.className}
        description={item.courseDescription}
        onSelectCourse={() =>
          navigation.navigate('CourseHomeDetail', { courseId: item.classId })
        }
      />
    );
  };

  const filterCmp = () => {
    return (
      <View>
        <Dropdown options={options} />
      </View>
    );
  };

  return (
    <FlatList
      style={tw`flex-1 px-3 bg-white`}
      refreshing={isRefreshing}
      onRefresh={loadData}
      data={isFree ? freeCourses : boutiqueCourses}
      keyExtractor={(item) => item.classId}
      ListHeaderComponent={filterCmp}
      renderItem={renderGridItem}
    />
  );
};

export default FreeCourseScreen;
