import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import TitleText from '../components/TitleText';
import BaseText from '../components/BaseText';
import { useSelector } from 'react-redux';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import ListAccordion from '../components/ListAccordion';
import API_URL from '../constants/Config';

const videoType = {
  1: '视频',
  2: '课件',
  3: '高清',
  4: '直播',
};

const VideoDetailScreen = ({ navigation, route }) => {
  const { isFree } = route.params;
  const [tryTime, setTryTime] = useState(0);
  const selectedCourse = useSelector((state) => state.courses.courseInfo);
  const myCoursesId = useSelector((state) => state.courses.myCoursesId);
  const token = useSelector((state) => state.auth.token);
  const video = useRef(null);
  const [positionMillis, setPositionMillis] = useState(0);

  const [currentVideo, setCurrentVideo] = useState(null);

  const handleClickVideo = (media) => {
    if (!isFree && !myCoursesId.includes(selectedCourse.classId) && !media.tryTime) {
      Alert.alert(
        '提示',
        '您还没报考本班次的课程哦，请登录或者报名后再来学习哟!'
      );
      return;
    }
    // 试听的毫秒数
    setTryTime(media.tryTime * 60 * 1000);
    currentVideo && savePositionMillis(currentVideo.mediaId);
    setCurrentVideo(media);
  };

  const setOrientation = async () => {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      //Device is in landscape mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  useEffect(() => {
    currentVideo && playMedia(currentVideo.mediaId);
  }, [currentVideo]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      currentVideo && savePositionMillis(currentVideo.mediaId);
    });
    return unsubscribe;
  }, [currentVideo, positionMillis]);

  useEffect(() => {
    function tryListen() {
      if (!currentVideo || myCoursesId.includes(selectedCourse.classId)) return;
      if (!isFree && tryTime > 0 && positionMillis >= tryTime) {
        setCurrentVideo(null);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        Alert.alert('提示', '试听结束，请报名后再登录学习!', [
          { text: '知道了', onPress: () => setPositionMillis(0) },
        ]);
      }
    }

    tryListen();
  }, [tryTime, currentVideo, positionMillis]);

  const playMedia = async (mediaId) => {
    if (video.current && token) {
      const { data } = await getPositionMillis(mediaId);
      video.current.playFromPositionAsync(data.watchTime);
    } else {
      video.current.playFromPositionAsync(0);
    }
  };

  const savePositionMillis = (mediaId) => {
    if (mediaId && token) {
      fetch(`${API_URL}/train/watchLog/recordWatchLog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          mediaId,
          watchTime: positionMillis,
        }),
      });
    }
  };

  const getPositionMillis = async (mediaId) => {
    const response = await fetch(
      `${API_URL}/open/interface/getMediaPlayProcess`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          mediaId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('请求错误');
    }
    const resData = await response.json();
    return resData;
  };

  const _onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setPositionMillis(status.positionMillis);
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`bg-white`}>
          {currentVideo ? (
            <Video
              ref={video}
              style={tw`h-[200px] w-full`}
              source={{
                uri: currentVideo.mediaUrl,
              }}
              onFullscreenUpdate={setOrientation}
              useNativeControls
              resizeMode="contain"
              isLooping={false}
              onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
            />
          ) : (
            <Image
              style={tw`h-[200px] w-full`}
              source={require('../assets/images/kecheng.jpg')}
            />
          )}
          <View style={tw`m-3`}>
            <TitleText
              titleText={currentVideo ? currentVideo.mediaName : '媒体名称'}
            />
          </View>
          <View style={tw`h-[9px] bg-gray-100`}></View>
          <View style={tw`p-3 border-b border-gray-300`}>
            <TitleText titleText={selectedCourse.className} />
          </View>
          <View style={tw`p-3 border-b border-gray-300 flex-row items-center`}>
            <Ionicons name="ios-book" />
            <BaseText style="ml-1">课程目录</BaseText>
          </View>
          {selectedCourse.catalogueList &&
            selectedCourse.catalogueList.map((video) => {
              return (
                <ListAccordion
                  key={video.catalogueId}
                  video={video}
                  onClickVideo={handleClickVideo}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoDetailScreen;
