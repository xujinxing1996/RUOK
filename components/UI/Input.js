import React, { useEffect, useReducer } from 'react';
import { Text, TextInput, View } from 'react-native';
import tw from 'twrnc';

const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: false,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.isValid, inputState.value);
    }
  }, [inputState, onInputChange, id]);

  const handleChangeText = (value) => {
    let isValid = true;
    if (props.required && value.trim().length === 0) {
      isValid = false;
    }
    dispatch({
      type: INPUT_UPDATE,
      value,
      isValid,
    });
  };

  const handleMissFocus = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <View style={tw`p-2`}>
      <TextInput
        {...props}
        style={tw`p-2 border-gray-400 border-b`}
        value={inputState.value}
        onChangeText={handleChangeText}
        onFocus={handleMissFocus}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={tw`my-2`}>
          <Text style={tw.style('text-red-500', { fontFamily: 'NotoSansSc-Regular', fontSize: 13 })}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
