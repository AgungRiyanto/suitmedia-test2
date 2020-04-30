import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {InputText, Button, Header} from '../components';
import events from '../../../events.json';
import {Actions} from 'react-native-router-flux';
import {showToast} from '../../helpers';
const FourthScreen = ({
  show,
  onClose,
  onSelect,
  data,
  isLoading,
  onLoadMore,
}) => {
  const [y, setY] = useState(new Animated.Value(0));

  return (
    <Modal onRequestClose={onClose} visible={show}>
      <View style={style.container}>
        <Header onBack={onClose} title="GUESTS" />
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: y}}}])}
          onMomentumScrollEnd={async ({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent) && !isLoading) {
              onLoadMore();
            }
          }}>
          <FlatList
            numColumns={2}
            data={_formatRow(data, 2)}
            renderItem={({item, index}) => {
              if (item.empty === true) {
                return (
                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                      backgroundColor: 'transparent',
                      height: 200,
                      borderRadius: 4,
                    }}
                  />
                );
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (isPrime(item.id)) {
                      alert('id is prime');
                    } else {
                      alert('id is not prime');
                    }
                    onSelect(item.first_name + ' ' + item.last_name);
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    margin: 5,
                    height: 200,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 150, height: 150, borderRadius: 100}}
                    source={{uri: item.avatar}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          {isLoading && <ActivityIndicator size="large" color="#ff7f00" />}
        </ScrollView>
      </View>
    </Modal>
  );
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const isPrime = num => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};

const _formatRow = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      id: `blank-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow++;
  }
  return data;
};

export default FourthScreen;

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
