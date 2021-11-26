import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const IonicsHeaderButton = (props) => {
  return (
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
  );
};

export default IonicsHeaderButton;