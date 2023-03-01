import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../containers/Home/HomeScreen';
import Constant from '../helper/appConstant';
import WelcomeScreen from '../containers/Welcome/WelcomeScreen';
import SetupUserScreen from '../containers/SetupUser/SetupUserScreen';

const Route = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={Constant.welcome} component={WelcomeScreen} />
                <Stack.Screen name={Constant.home} component={HomeScreen} />
                <Stack.Screen name={Constant.setupUser} component={SetupUserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;