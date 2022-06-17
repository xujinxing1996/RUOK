import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';
import { RefreshListView, RefreshState } from '../libs/refresh-list';

const FreeCourseScreen = ({ navigation, route }) => {
  const { isFree } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1 });
  const [refreshState, setRefreshState] = useState(RefreshState.Idle);
  const [list, setList] = useState([]);
  const [error, setError] = useState();
  const [projectCode, setProjectCode] = useState(null);
  const [subjectCode, setSubjectCode] = useState(null);
  const freeCourses = useSelector((state) => state.courses.freeCourses);
  const boutiqueCourses = useSelector((state) => state.courses.boutiqueCourses);
  const projectOptions = useSelector((state) => state.courses.projectOptions);
  const subjectOptions = useSelector((state) => state.courses.subjectOptions);
  const dispatch = useDispatch();

  const loadData = useCallback(
    async () => {
      setError(null);
      try {
        const isFooter = refreshState === RefreshState.FooterRefreshing;
        const params = {
          projectCode: projectCode ? projectCode.dictValue : '',
          subjectCode: subjectCode ? subjectCode.dictValue : '',
        };
        await dispatch(coursesAction.fetchProjectOptions());
        if (isFree) {
          await dispatch(
            coursesAction.fetchFreeCourses(pageInfo.page, 10, params, isFooter)
          );
        } else {
          await dispatch(
            coursesAction.fetchBoutiqueCourses(pageInfo.page, 10, params, isFooter)
          );
        }
        setRefreshState(RefreshState.Idle);
      } catch (error) {
        if (error.message === 'NoMoreData') {
          setRefreshState(RefreshState.NoMoreData);
        } else {
          setError(error.message);
        }
      }
    },
    [dispatch, pageInfo]
  );

  useEffect(() => {
    setPageInfo({ page: 1 });
  }, [projectCode, subjectCode]);

  useEffect(async () => {
    navigation.setOptions({
      title: isFree ? '免费课程' : '精品课程',
      headerBackTitle: '首页',
    });
    await loadData();
  }, [dispatch, loadData, navigation]);

  const handleFilterClick = () => {
    projectOptions.forEach((option) => {
      option.onPress = async () => {
        setProjectCode(option);
        await dispatch(coursesAction.fetchSubjectOptions(option.dictValue));
        setIsVisible(false);
      };
    });
    const options = projectOptions.concat({
      dictName: '取消',
      containerStyle: { backgroundColor: Colors.primary },
      titleStyle: { color: 'white' },
      onPress: () => {
        setProjectCode(null);
        setSubjectCode(null);
        dispatch(coursesAction.fetchSubjectOptions(''));
        setIsVisible(false);
      },
    });
    setList(options);
    setIsVisible(true);
  };

  const handleFilterSubjectClick = () => {
    subjectOptions.forEach((option) => {
      option.onPress = () => {
        setSubjectCode(option);
        setIsVisible(false);
      };
    });
    const options = subjectOptions.concat({
      dictName: '取消',
      containerStyle: { backgroundColor: Colors.primary },
      titleStyle: { color: 'white' },
      onPress: () => {
        setSubjectCode(null);
        setIsVisible(false);
      },
    });
    setList(options);
    setIsVisible(true);
  };

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>请求错误!</Text>
        <Button title="重试" onPress={loadData} color={Colors.primary} />
      </View>
    );
  }

  // if (isLoading) {
  //   return (
  //     <View style={tw`flex-1 justify-center items-center`}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  const renderGridItem = ({ item }) => {
    return (
      <MoreCourseItem
        imageUrl={item.classImage}
        title={item.className}
        description={item.courseDescription}
        onSelectCourse={() =>
          navigation.navigate('CourseHomeDetail', { courseId: item.classId, isFree: item.packagePrice === 0 })
        }
      />
    );
  };

  const filterCmp = () => {
    return (
      <View style={tw`flex-row`}>
        <Button
          title={projectCode ? projectCode.dictName : '项目'}
          buttonStyle={{
            minWidth: 100,
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
          title={subjectCode ? subjectCode.dictName : '科目'}
          buttonStyle={{
            minWidth: 100,
            backgroundColor: '#e5e7eb',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
            paddingHorizontal: 15,
          }}
          titleStyle={{ color: '#000' }}
          onPress={handleFilterSubjectClick}
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
      <RefreshListView
        style={tw`flex-1 px-3 bg-white`}
        ListHeaderComponent={filterCmp}
        data={isFree ? freeCourses : boutiqueCourses}
        refreshState={refreshState}
        onHeaderRefresh={() => {
          setPageInfo({ page: 1 });
          setRefreshState(() => RefreshState.HeaderRefreshing);
        }}
        onFooterRefresh={() => {
          setPageInfo(({ page }) => ({ page: page + 1 }));
          setRefreshState(() => RefreshState.FooterRefreshing);
        }}
        keyExtractor={(item) => item.classId}
        renderItem={renderGridItem}
      />
      {/* <FlatList
        style={tw`flex-1 px-3 bg-white`}
        refreshing={isRefreshing}
        onRefresh={loadData}
        data={isFree ? freeCourses : boutiqueCourses}
        keyExtractor={(item) => item.classId}
        ListHeaderComponent={filterCmp}
        renderItem={renderGridItem}
      /> */}
    </View>
  );
};

export default FreeCourseScreen;
