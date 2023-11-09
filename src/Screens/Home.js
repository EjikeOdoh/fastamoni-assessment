import {View, ScrollView} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import axios from 'axios';
import {useSelector} from 'react-redux';

import Container from '../components/Container';
import ProfileCard from '../components/ProfileCard';

import {COLORS} from '../constants/theme';

const Home = () => {
  const [users, setUsers] = React.useState([]);

  const fullName = useSelector(state => state.profile.fullName);
  const {firstName, lastName} = fullName;

  React.useEffect(() => {
    axios
      .get('https://reqres.in/api/users/')
      .then(res => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Text variant="headlineMedium" style={{marginTop: 50}}>
        Hi,{' '}
        <Text style={{color: COLORS.primary, fontFamily: 'Lato-Black'}}>
          {firstName} {lastName}
        </Text>
      </Text>
      <Text variant="bodyLarge">Welcome to My App</Text>
      <View style={{marginVertical: 20}}>
        <Text variant="bodyLarge">Start exploring the amazing features!</Text>
        <Text variant="bodyLarge">
          This app is designed to make your life easier. Get ready for an
          incredible experience.
        </Text>
      </View>

      <View style={{gap: 20}}>
        <Text variant="headlineSmall" style={{fontFamily: 'Lato-Bold'}}>
          Meet other <Text style={{color: COLORS.secondary}}>Incredible </Text>
          users
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 300,
            marginVertical: 20,
            backgroundColor: 'white',
          }}>
          {users.map((user, index) => (
            <ProfileCard
              key={index}
              avatar={user.avatar}
              email={user.email}
              first_name={user.first_name}
              last_name={user.last_name}
            />
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default Home;
