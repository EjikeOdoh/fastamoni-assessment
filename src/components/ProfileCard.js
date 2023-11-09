import {View, Image} from 'react-native';
import React from 'react';

import {Surface, Text} from 'react-native-paper';

const ProfileCard = ({avatar, email, first_name, last_name}) => {
  return (
    <Surface
      style={{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10,
        borderRadius: 10,
      }}>
      <Image
        source={{uri: avatar}}
        height={100}
        width={100}
        style={{borderRadius: 5}}
      />
      <View>
        <Text variant="bodyLarge" style={{fontFamily: 'Lato-Bold'}}>
          {first_name} {last_name}
        </Text>
        <Text variant="labelMedium">{email}</Text>
      </View>
    </Surface>
  );
};

export default ProfileCard;
