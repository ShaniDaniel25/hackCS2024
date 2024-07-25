import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './screens/MainPage';
import { createStackNavigator } from '@react-navigation/stack';
import RedButtonScreen from './screens/RedButtonScreen';
import ToolsScreen from './screens/ToolsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="RedButton" component={RedButtonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tools" component={ToolsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

