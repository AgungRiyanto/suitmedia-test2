import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {InputText, Button} from '../components';
import {Actions} from 'react-native-router-flux';
import {showToast} from '../../helpers';
class FirstScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      palindrome: '',
    };
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.bgtop}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="stretch"
            source={require('../../assets/bg_bright.png')}
          />
          <View style={{position: 'absolute', top: 50, alignSelf: 'center'}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              Welcome
            </Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
              This app for suitmedia mobile developer test
            </Text>
          </View>
        </View>
        <View style={[style.content, style.shadow]}>
          <Image
            style={{width: 100, height: 100, marginBottom: 10}}
            resizeMode="contain"
            source={require('../../assets/img_avatar.png')}
          />
          <InputText
            value={this.state.name}
            placeholder="Type name"
            onChangeText={text => this.setState({name: text})}
          />
          <InputText
            value={this.state.palindrome}
            placeholder="Type text palindrome"
            onChangeText={text => this.setState({palindrome: text})}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Button
              rounded={true}
              color={'#ff7f00'}
              style={{alignSelf: 'center', width: '68%', ...style.shadow}}
              onPress={() => Actions.second({name: this.state.name})}>
              <Text style={{textAlign: 'center', color: 'white'}}>Next</Text>
            </Button>
            <Button
              rounded={true}
              color={'#ff7f00'}
              style={{alignSelf: 'center', width: '30%', ...style.shadow}}
              onPress={() => {
                if (this.checkPalindrom(this.state.palindrome)) {
                  alert('isPalindrome');
                } else {
                  alert('not palindrome');
                }
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Check</Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              color: 'grey',
              marginBottom: 10,
            }}>
            Copyright &copy; 2020 Suitmedia All right reserved.
          </Text>
        </View>
      </View>
    );
  }

  checkPalindrom(str) {
    let string = str
      .replace(/[^\w]/gi, '') // replace all non-words characters
      .toLowerCase(); // make all characters lower cased
    return (
      string ==
      string
        .split('')
        .reverse()
        .join('')
    );
  }
}

export default FirstScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  bgtop: {
    height: '30%',
    width: '100%',
    backgroundColor: '#ff7f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    height: '60%',
    marginTop: -50,
  },
  shadow: {
    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
});
