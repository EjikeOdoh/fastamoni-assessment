import React, {useState, useEffect} from 'react';
import {
  Button,
  PanResponder,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const App = () => {
  const [show, setShow] = useState(false);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer();
      return true;
    },
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      resetTimer();
      return false;
    },
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  let timer;

  useEffect(() => {
    timer = setTimeout(() => setShow(true), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const resetTimer = () => {
    clearTimeout(timer);
    if (show) setShow(false);
    timer = setTimeout(() => setShow(true), 5000);
  };

  return (
    <View
      style={styles.container}
      collapsable={false}
      {...panResponder.panHandlers}>
      {show ? <Text style={{fontSize: 30}}>Timer Expired: 5 sec</Text> : null}

      <TouchableOpacity>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
      </TouchableOpacity>

      <Button title="Here is a button for some reason" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default App;
