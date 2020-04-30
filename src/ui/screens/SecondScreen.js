import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {InputText, Button} from '../components';
import {Actions} from 'react-native-router-flux';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
class SecondScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      eventName: '',
      guestName: '',
      selectEvent: false,
      selectGuest: false,
      guests: {
        data: [],
        page: 1,
        per_page: 10,
        total: 12,
        total_pages: 2,
      },
      height: 20,
      isLoading: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props.navigation.state.params.name) {
      this.setState({name: this.props.navigation.state.params.name});
    }

    fetch('https://reqres.in/api/users?page=1&per_page=10')
      .then(async response => {
        console.log(response);
        return response.json();
      })
      .then(resJson => {
        console.log(resJson, 'kantal');
        this.setState({guests: resJson});
      })
      .catch(e => {
        console.log(e);
      });
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
          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 20}}>
              <Text style={{color: 'grey', fontSize: 22}}>Hallo,</Text>
              <Text
                style={{color: '#ff7f00', fontSize: 24, fontWeight: 'bold'}}>
                {this.state.name}
              </Text>
            </View>
            <View>
              <View style={[style.line, {width: 250, marginBottom: 10}]}></View>
              <View style={[style.line, {width: 280, marginBottom: 10}]}></View>
              <View style={[style.line, {width: 250, marginBottom: 10}]}></View>
            </View>
          </View>
        </View>
        <Button
          rounded={true}
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            this.setState({height});
          }}
          color={'#ff7f00'}
          style={{
            alignSelf: 'center',
            marginTop: -this.state.height / 2,
            width: '80%',
            ...style.shadow,
          }}
          onPress={() => this.setState({selectEvent: true})}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {this.state.eventName ? this.state.eventName : 'Choose Event'}
          </Text>
        </Button>
        <Button
          rounded={true}
          color={'#ff7f00'}
          style={{
            alignSelf: 'center',
            marginTop: 15,
            width: '80%',
            ...style.shadow,
          }}
          onPress={() => this.setState({selectGuest: true})}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {this.state.guestName ? this.state.guestName : 'Choose Guest'}
          </Text>
        </Button>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: 250, height: 250, marginBottom: 10}}
            resizeMode="contain"
            source={require('../../assets/img_suitmedia.png')}
          />
        </View>
        <Image
          style={{
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 0,
            tintColor: 'grey',
            opacity: 0.3,
          }}
          resizeMode="stretch"
          source={require('../../assets/img_bg_bottom.png')}
        />
        <ThirdScreen
          onSelect={value => this.setState({eventName: value})}
          onClose={() => this.setState({selectEvent: false})}
          show={this.state.selectEvent}
        />
        <FourthScreen
          isLoading={this.state.isLoading}
          onLoadMore={this.onLoadMore}
          data={this.state.guests.data}
          onSelect={value => this.setState({guestName: value})}
          onClose={() => this.setState({selectGuest: false})}
          show={this.state.selectGuest}
        />
      </View>
    );
  }

  onLoadMore = async () => {
    const {page, per_page, data, total_pages} = this.state.guests;
    if (page === total_pages) {
      return false;
    }
    await this.setState({isLoading: true});
    console.log('kambing');
    fetch(`https://reqres.in/api/users?page=${page + 1}&per_page=${per_page}`)
      .then(async response => {
        console.log(response);
        return response.json();
      })
      .then(resJson => {
        let newres = {...resJson};
        let oldData = data;
        for (var i in resJson.data) {
          oldData.push(resJson.data[i]);
        }
        newres.data = oldData;
        console.log(resJson, 'kantal');
        setTimeout(() => {
          this.setState({guests: newres, isLoading: false});
        }, 2000);
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export default SecondScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgtop: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderBottomColor: '#ff7f00',
    borderBottomWidth: 2,
    alignSelf: 'flex-end',
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
