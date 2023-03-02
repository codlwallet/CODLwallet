import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../containers/Home/HomeScreen';
import Constant from '../helper/appConstant';
import WelcomeScreen from '../containers/Welcome/WelcomeScreen';
import SetupUserScreen from '../containers/SetupUser/SetupUserScreen';
import CreatedUserScreen from '../containers/CreatedUser/CreatedUserScreen';
import SetupWalletScreen from '../containers/SetupWallet/SetupWalletScreen';
import AttentionScreen1 from '../containers/SetupWallet/AttentionScreen1';
import AttentionScreen2 from '../containers/SetupWallet/AttentionScreen2';

const Route = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={Constant.welcome} component={WelcomeScreen} />
                <Stack.Screen name={Constant.home} component={HomeScreen} />
                <Stack.Screen name={Constant.setupUser} component={SetupUserScreen} />
                <Stack.Screen name={Constant.createdUser} component={CreatedUserScreen} />
                <Stack.Screen name={Constant.setupWallet} component={SetupWalletScreen} />
                <Stack.Screen name={Constant.attentionScreen1} component={AttentionScreen1} />
                <Stack.Screen name={Constant.attentionScreen2} component={AttentionScreen2} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Route;