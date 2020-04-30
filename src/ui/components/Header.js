import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const Header = ({title, onBack, titleColor, right}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <TouchableOpacity onPress={onBack}>
          <Image
            style={{width: 25, height: 25}}
            resizeMode="contain"
            source={require('../../assets/ic_back_white.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '70%'}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: titleColor ? titleColor : 'white',
          }}>
          {title}
        </Text>
      </View>
      <View style={{width: '20%'}}>{right}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ff7f00',
  },
});
