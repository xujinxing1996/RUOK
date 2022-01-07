import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import TitleText from '../components/TitleText';
import BaseText from '../components/BaseText';
import { useSelector } from 'react-redux';
import { Video } from 'expo-av';
import ListAccordion from '../components/ListAccordion';

const videoType = {
  1: '视频',
  2: '课件',
  3: '高清',
  4: '直播',
};

const VideoDetailScreen = () => {
  const selectedCourse = useSelector((state) => state.courses.courseInfo);
  const video = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleClickVideo = (media) => {
    video.current && video.current.stopAsync();
    setCurrentVideo(media);
  };

  useEffect(() => {
    video.current && video.current.replayAsync();
  }, [currentVideo]);

  const CatalogItem = ({ media }) => {
    return (
      <Pressable
        onPress={() => handleClickVideo(media)}
        style={tw`ml-9 p-2 my-1 border-b border-gray-300 flex-row justify-around`}
      >
        <BaseText>{media.mediaName}</BaseText>
        <BaseText>{videoType[media.mediaType]}</BaseText>
        <BaseText style="px-3 font-bold bg-indigo-200 text-blue-500 rounded-xl">
          0%
        </BaseText>
      </Pressable>
    );
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
              useNativeControls
              resizeMode="contain"
              isLooping={false}
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
