import React, { useCallback, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { RefreshListView, RefreshState } from '../libs/refresh-list';
import MoreCourseItem from '../components/MoreCourseItem';
import Colors from '../constants/Colors';
import * as coursesAction from '../store/actions/courses';
import * as swipersActions from '../store/actions/swipers';
import Swiper from 'react-native-swiper';

const CoursesScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [list, setList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1 });
  const [selectClassName, setSelectClassName] = useState({
    title: '全部课程',
    code: 'SI0009',
  });
  const [refreshState, setRefreshState] = useState(RefreshState.Idle);
  const allCourses = useSelector((state) => state.courses.allCourses);
  const swipers = useSelector((state) => state.swipers.coursesSwiperImgs);
  const projectOptions = useSelector((state) => state.courses.projectOptions);
  const subjectOptions = useSelector((state) => state.courses.subjectOptions);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '课程',
      headerShadowVisible: false,
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const handleFilterClick = () => {
    projectOptions.forEach((option) => {
      option.onPress = async () => {
        await dispatch(coursesAction.fetchSubjectOptions(option.dictValue));
        setIsVisible(false);
      };
    });
    const options = projectOptions.concat({
      dictName: '取消',
      containerStyle: { backgroundColor: Colors.primary },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    });
    setList(options);
    setIsVisible(true);
  };

  const handleFilterSubjectClick = () => {
    const options = subjectOptions.concat({
      dictName: '取消',
      containerStyle: { backgroundColor: Colors.primary },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    });
    setList(options);
    setIsVisible(true);
  };

  const handleClassNameClick = async (value) => {
    setPageInfo({ page: 1 });
    setSelectClassName(value);
    setIsVisible(false);
  };

  const handleFilterClassNameClick = () => {
    setList([
      {
        dictName: '全部课程',
        onPress: () =>
          handleClassNameClick({
            title: '全部课程',
            code: 'SI0009',
          }),
      },
      {
        dictName: '精品课程',
        onPress: () =>
          handleClassNameClick({
            title: '精品课程',
            code: 'SI0007',
          }),
      },
      {
        dictName: '免费课程',
        onPress: () =>
          handleClassNameClick({
            title: '免费课程',
            code: 'SI0008',
          }),
      },
      {
        dictName: '取消',
        containerStyle: { backgroundColor: Colors.primary },
        titleStyle: { color: 'white' },
        onPress: () => setIsVisible(false),
      },
    ]);
    setIsVisible(true);
  };

  const loadData = useCallback(async () => {
    try {
      const isFooter = refreshState === RefreshState.FooterRefreshing;
      console.log(`selectClassName`, selectClassName);
      await dispatch(coursesAction.fetchProjectOptions());
      await dispatch(swipersActions.fetchSiwpers('SI0006'));
      await dispatch(
        coursesAction.fetchGetCourses(
          pageInfo.page,
          5,
          isFooter,
          selectClassName.code
        )
      );
      setRefreshState(RefreshState.Idle);
    } catch (error) {
      console.log(`error`, error);
      if (error.message === 'NoMoreData') {
        setRefreshState(RefreshState.NoMoreData);
      } else {
        setError(error.message);
      }
    }
  }, [dispatch, pageInfo, selectClassName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>请求错误!</Text>
        <Button title="重试" onPress={loadData} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 px-3 bg-white`}>
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
        ListHeaderComponent={
          <View>
            <View style={tw`flex-row`}>
              <Button
                title="项目"
                buttonStyle={styles.filterBtn}
                titleStyle={{ color: '#000' }}
                onPress={handleFilterClick}
              />
              <Button
                title="科目"
                buttonStyle={styles.filterBtn}
                titleStyle={{ color: '#000' }}
                onPress={handleFilterSubjectClick}
              />
            </View>
            <View style={tw`rounded-xl overflow-hidden`}>
              <Swiper autoplay={true} style={tw`h-[200px] my-1.5`}>
                {swipers &&
                  swipers.map((item, index) => {
                    return (
                      <Image
                        key={item.description + index}
                        testId={item.description}
                        resizeMode="stretch"
                        style={tw`w-full h-[200px]`}
                        source={{
                          uri: item.imageUrl,
                        }}
                      />
                    );
                  })}
              </Swiper>
            </View>
            <View style={tw`flex-row`}>
              <Button
                title={selectClassName.title}
                buttonStyle={styles.filterBtn}
                titleStyle={{ color: '#000' }}
                onPress={handleFilterClassNameClick}
              />
            </View>
          </View>
        }
        data={allCourses}
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
        renderItem={({ item }) => (
          <MoreCourseItem
            imageUrl={item.classImage}
            title={item.className}
            description={item.courseDescription}
            onSelectCourse={() =>
              navigation.navigate('CourseDetail', { courseId: item.classId })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    width: 115,
  },
});

export default CoursesScreen;
