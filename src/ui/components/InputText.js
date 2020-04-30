import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const InputText = ({onChangeText, value, placeholder}) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        // value={this.state.email}
        style={styles.inputText}
        placeholder={placeholder ? placeholder : 'Placeholder'}
        // onChangeText={text => this.setState({email: text})}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputView: {
    // borderWidth: 1,
    // borderColor: 'darkgrey',
    borderRadius: 100,
    backgroundColor: '#eee',
    width: '100%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    textAlign: 'center',
    // color: 'black',
  },
});
