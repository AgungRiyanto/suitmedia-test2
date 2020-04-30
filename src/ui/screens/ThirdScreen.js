import React, {useState} from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {InputText, Button, Header} from '../components';
import events from '../../../events.json';
import {Actions} from 'react-native-router-flux';
const {width, height} = Dimensions.get('window');
const ThirdScreen = ({show, onClose, onSelect, isLoading, onLoadMore}) => {
  const [y, setY] = useState(new Animated.Value(0));
  const [view, setView] = useState('list');
  const [active, setActive] = useState(events[0]);
  return (
    <Modal onRequestClose={onClose} visible={show}>
      <View style={style.container}>
        <Header
          right={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                style={{width: 25, height: 25}}
                resizeMode="contain"
                source={require('../../assets/ic_search_white.png')}
              />
              <TouchableOpacity
                onPress={() => {
                  if (view === 'list') {
                    setView('map');
                  } else {
                    setView('list');
                  }
                }}>
                {view === 'list' ? (
                  <Image
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                    source={require('../../assets/ic_map_view.png')}
                  />
                ) : (
                  <Image
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                    source={require('../../assets/ic_list_view.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          }
          onBack={onClose}
          title="EVENTS"
        />
        {view === 'list' && (
          <FlatList
            data={events}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    // padding: 10,
                    width: '90%',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                    marginHorizontal: 9,
                    borderRadius: 10,
                    ...style.shadow,
                  }}>
                  <View style={{width: '50%'}}>
                    <Image
                      style={{width: '100%', height: 150}}
                      resizeMode="stretch"
                      source={require('../../assets/events/event1.jpg')}
                    />
                  </View>
                  <View style={{width: '50%', padding: 15}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                    <Text style={{fontSize: 16, marginTop: 5}}>
                      lorem ipsum dolor sit amet
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <Text style={{color: 'grey'}}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {view === 'map' && (
          <View
            style={{
              position: 'absolute',
              top: '10%',
              backgroundColor: 'transparent',
              zIndex: 999999,
            }}>
            <Carousel
              firstItem={1}
              data={events}
              sliderWidth={width}
              itemWidth={width * (80 / 100)}
              onSnapToItem={index => {
                setActive(events[index]);
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.name);
                    onClose();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      // padding: 10,
                      width: '100%',
                      overflow: 'hidden',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 5,
                      borderRadius: 10,
                      ...style.shadow,
                    }}>
                    <View style={{width: '50%'}}>
                      <Image
                        style={{width: '100%', height: 150}}
                        resizeMode="stretch"
                        source={require('../../assets/events/event1.jpg')}
                      />
                    </View>
                    <View style={{width: '50%', padding: 15}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 16, marginTop: 5}}>
                        lorem ipsum dolor sit amet
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Text style={{color: 'grey'}}>{item.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {view === 'map' && (
          <View>
            <MapView
              style={{width: width, height: height}} //window pake Dimensions
              region={{
                latitude: active.latitude,
                longitude: active.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {events.map(item => {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    title={item.name}
                    description={item.desc}>
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={
                        active.id === item.id
                          ? require('../../assets/ic_marker_selected.png')
                          : require('../../assets/ic_marker_unselected.png')
                      }
                    />
                  </MapView.Marker>
                );
              })}
            </MapView>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ThirdScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2,
    elevation: 4,
  },
});
