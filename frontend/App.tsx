// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RedButtonScreen from './screens/RedButtonScreen';
import MapScreen from './screens/MapScreen';
import ToolsScreen from './screens/ToolsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="SOS" component={RedButtonScreen} />
    <Tab.Screen name="Map" component={MapScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Tools" component={ToolsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
