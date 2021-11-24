import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const UserScreen = (props) => {
  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`flex-row items-center mx-10 my-8`}>
        <View
          style={tw`rounded-full bg-purple-200 h-15 w-15 items-center justify-center mr-4`}
        >
          <Ionicons name="ios-person" size={35} color="purple" />
        </View>
        <View>
          <Text>张三</Text>
          <Text>13812348001</Text>
        </View>
      </View>
      <View style={tw`rounded-full py-3 px-6 bg-purple-400 mx-8 h-12`}></View>
      <View style={tw`h-[9px] my-4 bg-gray-200`}></View>
      <View>
        <View
          style={tw`px-8 py-2 border-b border-gray-300 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-clipboard" size={20} />
            <Text style={tw`ml-3 font-bold`}>我的资料</Text>
          </View>
          <Ionicons name="ios-chevron-forward" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-300 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-layers" size={20} />
            <Text style={tw`ml-3 font-bold`}>设置</Text>
          </View>
          <Ionicons name="ios-chevron-forward" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-300 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-mail" size={20} />
            <Text style={tw`ml-3 font-bold`}>意见反馈</Text>
          </View>
          <Ionicons name="ios-chevron-forward" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-300 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-map" size={20} />
            <Text style={tw`ml-3 font-bold`}>课程协议</Text>
          </View>
          <Ionicons name="ios-chevron-forward" size={20} />
        </View>
        <View
          style={tw`px-8 py-2 border-b border-gray-300 flex-row justify-between items-center`}
        >
          <View style={tw`flex-row`}>
            <Ionicons name="ios-information-circle" size={20} />
            <Text style={tw`ml-3 font-bold`}>关于我们</Text>
          </View>
          <Ionicons name="ios-chevron-forward" size={20} />
        </View>
      </View>
    </View>
  );
};

export default UserScreen;
