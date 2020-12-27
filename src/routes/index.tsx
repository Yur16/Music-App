import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Player from '../pages/Player';

const App = createStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator screenOptions={{
    headerShown: false,
  }}>
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Player" component={Player} />
  </App.Navigator>
);

export default Routes;