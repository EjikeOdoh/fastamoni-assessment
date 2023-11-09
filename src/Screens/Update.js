import {View, StyleSheet, Alert} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';

import {Text, TextInput, Button} from 'react-native-paper';
import Container from '../components/Container';
import {setName} from '../../redux/profileSlice';
import {COLORS} from '../constants/theme';

const Update = ({navigation}) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = React.useState({});

  const handleUpdate = () => {
    dispatch(setName(fullName));
    Alert.alert('Update Successful', '', [
      {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]);
    setFullName({});
  };

  return (
    <Container>
      <Text
        variant="titleLarge"
        style={{
          textAlign: 'center',
          fontFamily: 'Lato-Bold',
          color: COLORS.primary,
        }}>
        Update your profile
      </Text>
      <View style={{gap: 20, marginVertical: 50}}>
        <TextInput
          mode="outlined"
          label="FirstName"
          style={styles.input}
          onChangeText={text => setFullName({...fullName, firstName: text})}
          value={fullName.firstName}
        />
        <TextInput
          mode="outlined"
          label="LastName"
          style={styles.input}
          onChangeText={text => setFullName({...fullName, lastName: text})}
          value={fullName.lastName}
        />
      </View>

      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={{fontFamily: 'Lato-Black'}}
        onPress={handleUpdate}>
        Save Changes
      </Button>
    </Container>
  );
};

export default Update;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 14,
  },

  button: {
    borderRadius: 10,
    marginVertical: 20,
  },
});
