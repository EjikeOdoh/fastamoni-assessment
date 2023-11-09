import {View} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import {Button, Modal, Text, Surface} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {setToken} from '../../redux/profileSlice';
import {COLORS} from '../constants/theme';

const Setting = ({navigation}) => {
  const [logOutModal, setLogOutModal] = React.useState(false);
  const showLogOutModal = () => setLogOutModal(true);
  const hideLogOutModal = () => setLogOutModal(false);

  const dispatch = useDispatch();

  return (
    <Container>
      <Text
        variant="titleLarge"
        style={{
          textAlign: 'center',
          fontFamily: 'Lato-Bold',
          color: COLORS.primary,
          marginBottom: 50,
        }}>
        Settings
      </Text>

      <Button
        mode="contained"
        labelStyle={{fontFamily: 'Lato-Bold', color: 'white'}}
        style={{borderRadius: 10, marginBottom: 20}}
        onPress={() => navigation.navigate('Update')}>
        Update Profile
      </Button>
      <Button
        mode="elevated"
        labelStyle={{fontFamily: 'Lato-Bold'}}
        style={{borderRadius: 10, marginBottom: 20}}
        onPress={showLogOutModal}>
        Log Out
      </Button>
      <Modal
        visible={logOutModal}
        onDismiss={hideLogOutModal}
        contentContainerStyle={{
          margin: 20,
        }}>
        <Surface style={{padding: 20, borderRadius: 10}}>
          <Text variant="labelLarge" style={{fontFamily: 'Lato-Bold'}}>
            Do you really want to leave this awesome app?
          </Text>
          <View style={{flexDirection: 'row', gap: 25, marginVertical: 10}}>
            <Button
              mode="contained"
              labelStyle={{fontFamily: 'Lato-Bold'}}
              style={{flex: 1, borderRadius: 10}}
              onPress={hideLogOutModal}>
              Nope
            </Button>
            <Button
              mode="contained-tonal"
              labelStyle={{fontFamily: 'Lato-Black'}}
              style={{flex: 1, borderRadius: 10}}
              onPress={() => dispatch(setToken(null))}>
              Yes
            </Button>
          </View>
        </Surface>
      </Modal>
    </Container>
  );
};

export default Setting;
