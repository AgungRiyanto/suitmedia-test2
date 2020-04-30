import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';

const Button = ({style, onPress, rounded, color, children, onLayout}) => {
  return (
    <TouchableNativeFeedback
      onLayout={onLayout}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#f4f4f4', false)}>
      <View
        style={[
          styles.default, // default style
          style, // income style
          rounded ? styles.rounded : false, // for set rounded button
          color ? {backgroundColor: color} : false,
        ]}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: undefined,
  },
  rounded: {
    borderRadius: 100,
  },
});
