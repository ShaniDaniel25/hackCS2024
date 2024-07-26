"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
var RedButtonScreen_1 = require("./screens/RedButtonScreen");
var ToolsScreen_1 = require("./screens/ToolsScreen");
var Stack = (0, stack_1.createStackNavigator)();
var App = function () {
    return (<native_1.NavigationContainer>
      <Stack.Navigator initialRouteName="RedButton">
        <Stack.Screen name="RedButton" component={RedButtonScreen_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="Tools" component={ToolsScreen_1.default} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </native_1.NavigationContainer>);
};
exports.default = App;
