import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ThemeContext from '../context/ThemeContext';
import GameScreen from '../screens/GameScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import EditPlaylistDetailsScreen from '../screens/EditPlaylistDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const { theme } = useContext(ThemeContext);

    return (
        <Tab.Navigator 
        screenOptions={{ tabBarActiveTintColor: '#1DB954', 
            tabBarInactiveTintColor: theme === 'dark' ? '#888' : '#555',
            tabBarStyle: {
                backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7',
                borderTopColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7',
            },
            headerStyle : {
                backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7',
            },
            headerTintColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
         }}>
            {/* <Tab.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/> */}
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />, headerTitleAlign: 'center'}}/>
            <Tab.Screen name="Playlists" component={PlaylistScreen} options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-music-outline" size={30} color={color} />, headerTitleAlign: 'center'}}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />}}/>
        </Tab.Navigator>
    );
}

function StackNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <Stack.Navigator screenOptions={{headerTitleStyle: {fontWeight: 'bold'}}}>
            <Stack.Screen name="Back" component={BottomTabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="GameScreen" component={GameScreen} options={{
                headerStyle: {backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7'}, 
                headerTintColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                }}/>
            <Stack.Screen name="PlaylistDetails" component={EditPlaylistDetailsScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigator;