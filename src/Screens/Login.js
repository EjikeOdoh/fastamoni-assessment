import {View, StyleSheet, Alert} from 'react-native';
import React from 'react';

import {Button, TextInput, Text, ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {COLORS} from '../constants/theme';
import Container from '../components/Container';
import {setFullName, setToken} from '../../redux/profileSlice';

const Login = ({navigation, route}) => {
  const {params} = route;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const [fullName, setFullName] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => setVisible(!visible);

  const handleLogin = async () => {
    if (!email && !password) {
      return Alert.alert('Fill all details');
    }
    if (!email) {
      return Alert.alert('Enter email');
    }
    if (!password) {
      return Alert.alert('Enter password');
    }

    setIsLoading(true);

    try {
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      const {token} = res.data;
      dispatch(setToken(token));
      dispatch(setFullName(fullName || params.fullName));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setEmail(params?.email || '');
    setFullName(params?.fullName || {});
  }, [params]);

  return (
    <Container>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              alignSelf: 'center',
              marginVertical: 20,
              gap: 20,
            }}>
            <Text
              variant="displaySmall"
              style={{textAlign: 'center', color: COLORS.primary}}>
              Login
            </Text>
            <SimpleLineIcon name="login" size={40} color={COLORS.primary} />
          </View>

          <View style={{gap: 20, marginVertical: 30}}>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TextInput
                mode="outlined"
                label="FirstName"
                style={[styles.input, {flex: 1}]}
                onChangeText={text =>
                  setFullName({...fullName, firstName: text})
                }
                value={fullName.firstName}
              />
              <TextInput
                mode="outlined"
                label="LastName"
                style={[styles.input, {flex: 1}]}
                onChangeText={text =>
                  setFullName({...fullName, lastName: text})
                }
                value={fullName.lastName}
              />
            </View>
            <TextInput
              mode="outlined"
              label="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Password"
              secureTextEntry={!visible}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={visible ? 'eye' : 'eye-off'}
                  onPress={toggleVisible}
                  color={COLORS.primary}
                />
              }
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>

          <View
            style={{
              gap: 20,
              width: '80%',
              alignSelf: 'center',
              marginVertical: 50,
            }}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleLogin}>
              Login
            </Button>
            <Button
              labelStyle
              style={styles.button}
              mode="outlined"
              onPress={() => navigation.navigate('Register')}>
              Create Account
            </Button>
          </View>
        </>
      )}
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 14,
  },

  button: {
    borderRadius: 10,
  },
});
