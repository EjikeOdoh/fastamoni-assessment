import {SafeAreaView} from 'react-native';
import React from 'react';

const Container = ({children}) => {
  return (
    <SafeAreaView style={{padding: 20, flex: 1, backgroundColor: 'white'}}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
