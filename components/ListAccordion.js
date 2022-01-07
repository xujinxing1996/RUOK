import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import tw from 'twrnc';

const ListAccordion = ({ video, onClickVideo = null }) => {
  const [expanded, setExpanded] = useState(false);
  const isHaveChildren = !!video.medias;
  return (
    <ListItem.Accordion
      style={tw`bg-white ${isHaveChildren ? 'ml-3 bg-black' : ''}`}
      content={
        <>
          <View style={tw`flex-1 flex-row items-center`}>
            <Icon name="folder-video" color="#00aced" type="entypo" size={20} />
            <Text style={tw`px-1`}>{video.catalogueName}</Text>
          </View>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {video.medias ? video.medias.map((item) => (
        <ListItem key={item.mediaId} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {onClickVideo ? (
                <Pressable
                  onPress={() => onClickVideo(item)}
                  style={tw`flex-row items-center pl-4`}
                >
                  <Icon type="ionicon" name="videocam" color="blue" size={20} />
                  <Text style={tw`px-1`}>{item.mediaName}</Text>
                </Pressable>
              ) : (
                <View style={tw`flex-row items-center pl-4`}>
                  <Icon type="ionicon" name="videocam" size={20} />
                  <Text style={tw`px-1`}>{item.mediaName}</Text>
                </View>
              )}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )) : (
        video.children.map((videoChild) => (
          <ListAccordion key={videoChild.catalogueId} video={videoChild} onClickVideo={onClickVideo} />
        ))
      )}
    </ListItem.Accordion>
  );
};

export default ListAccordion;
