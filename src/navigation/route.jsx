import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../containers/Home/HomeScreen';
import Constant from '../helper/appConstant';
import WelcomeScreen from '../containers/Welcome/WelcomeScreen';
import SetupUserScreen from '../containers/SetupUser/SetupUserScreen';
import CreatedUserScreen from '../containers/CreatedUser/CreatedUserScreen';
import SetupWalletScreen from '../containers/SetupWallet/SetupWalletScreen';
import AttentionScreen1 from '../containers/CreateWallet/AttentionScreen1';
import AttentionScreen2 from '../containers/CreateWallet/AttentionScreen2';
import CreateWalletScreen from '../containers/CreateWallet/CreateWalletScreen';
import AttentionScreen3 from '../containers/CreateWallet/AttentionScreen3';
import ComplateSeedsScreen from '../containers/ConfirmSeeds/ComplateSeedsScreen';
import ConfirmSeedsScreen from '../containers/ConfirmSeeds/ConfirmSeedsScreen';
import ImportWalletScreen from '../containers/ImportWallet/ImportWalletScreen';

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
                <Stack.Screen name={Constant.createWallet} component={CreateWalletScreen} />
                <Stack.Screen name={Constant.attentionScreen3} component={AttentionScreen3} />
                <Stack.Screen name={Constant.confirmSeeds} component={ConfirmSeedsScreen} />
                <Stack.Screen name={Constant.complateSeeds} component={ComplateSeedsScreen} />
                <Stack.Screen name={Constant.importWallet} component={ImportWalletScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Route;