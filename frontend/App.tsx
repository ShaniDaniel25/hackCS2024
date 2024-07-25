import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RedButtonScreen from './screens/RedButtonScreen';
import ToolsScreen from './screens/ToolsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RedButton">
        <Stack.Screen name="RedButton" component={RedButtonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tools" component={ToolsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
