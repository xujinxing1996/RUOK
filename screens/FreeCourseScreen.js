import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';
import { commonStyle } from '../styles';

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

const FreeCourseScreen = ({ navigation, route }) => {
  const { isFree } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState();
  const freeCourses = useSelector((state) => state.courses.freeCourses);
  const boutiqueCourses = useSelector((state) => state.courses.boutiqueCourses);
  const projectOptions = useSelector((state) => state.courses.projectOptions);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(coursesAction.fetchProjectOptions());
      if (isFree) {
        await dispatch(coursesAction.fetchFreeCourses(1, 10, false));
      } else {
        await dispatch(coursesAction.fetchBoutiqueCourses(1, 10, false));
      }
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  const handleFilterClick = () => {
    const options = projectOptions.concat({
      dictName: '取消',
      containerStyle: { backgroundColor: Colors.primary },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    });
    setList(options);
    setIsVisible(true);
  };

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
      <View style={tw`flex-row`}>
        <Button
          title="项目"
          buttonStyle={{
            width: 100,
            backgroundColor: '#e5e7eb',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
            paddingHorizontal: 15,
          }}
          titleStyle={{ color: '#000' }}
          onPress={handleFilterClick}
        />
        <Button
          title="科目"
          buttonStyle={{
            width: 100,
            backgroundColor: '#e5e7eb',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
            paddingHorizontal: 15,
          }}
          titleStyle={{ color: '#000' }}
          onPress={handleFilterClick}
        />
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.dictName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <FlatList
        style={tw`flex-1 px-3 bg-white`}
        refreshing={isRefreshing}
        onRefresh={loadData}
        data={isFree ? freeCourses : boutiqueCourses}
        keyExtractor={(item) => item.classId}
        ListHeaderComponent={filterCmp}
        renderItem={renderGridItem}
      />
    </View>
  );
};

export default FreeCourseScreen;
