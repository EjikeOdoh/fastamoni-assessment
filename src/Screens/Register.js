import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React from 'react';
import {
  Button,
  TextInput,
  Text,
  ActivityIndicator,
  Chip,
} from 'react-native-paper';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import Octicon from 'react-native-vector-icons/Octicons';
import Container from '../components/Container';

import {COLORS} from '../constants/theme';
import {setName} from '../../redux/profileSlice';

const Register = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [fullName, setFullName] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => setVisible(!visible);

  const [verifiedEmails, setVerifiedEmails] = React.useState([]);

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!fullName.firstName && !fullName.lastName && !email && !password) {
      return Alert.alert('Fill every detail');
    }

    setIsLoading(true);

    await axios
      .post('https://reqres.in/api/register/', {
        fullname: fullName,
        email: email,
        password: password,
      })
      .then(res => {
        const {token} = res.data;
        if (token) {
          dispatch(setName(fullName));
          navigation.navigate('Login', {...fullName, email});
        }
      })
      .catch(err => console.error(err));

    setIsLoading(false);
  };

  React.useEffect(() => {
    axios
      .get('https://reqres.in/api/users')
      .then(res => setVerifiedEmails(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              Create Account
            </Text>
            <Octicon name="person-add" size={40} color={COLORS.primary} />
          </View>

          <View style={{gap: 15, marginVertical: 20}}>
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
              secureTextEntry={visible}
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
              marginVertical: 30,
            }}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                handleRegister();
              }}>
              Create Account
            </Button>
          </View>

          <View style={{}}>
            <Text variant="titleSmall">List of emails to choose from</Text>
            <ScrollView>
              {verifiedEmails.map(email => {
                return (
                  <Chip key={email.id} disabled style={{marginVertical: 5}}>
                    {email.email}
                  </Chip>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 12,
    fontWeight: '500',
  },

  button: {
    borderRadius: 10,
  },
});
