import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

const Home: React.FC = () => {
  const naviagtion = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => naviagtion.navigate('Player')}>
      <Text>Home</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
