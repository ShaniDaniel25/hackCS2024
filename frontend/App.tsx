import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './screens/MainPage';
import { createStackNavigator } from '@react-navigation/stack';
import RedButtonScreen from './screens/RedButtonScreen';
import ToolsScreen from './screens/ToolsScreen';
import LoginScreen from './screens/LoginScreen';
import MoreInfoScreen from './screens/MoreInfoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MoreInfo" component={MoreInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="RedButton" component={RedButtonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tools" component={ToolsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
