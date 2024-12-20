import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ThemeContext from '../context/ThemeContext';
<<<<<<< Updated upstream
=======
import GameScreen from '../screens/GameScreen';
import PlaylistScreen from '../screens/PlaylistsScreen';
>>>>>>> Stashed changes

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
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />,headerTitleAlign: 'center'}}/>
            <Tab.Screen name="Playlists" component={PlaylistScreen} options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-music-outline" size={30} color={color} />,headerTitleAlign: 'center'}}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />}}/>
        </Tab.Navigator>
    );
}

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerTitleStyle: {fontWeight: 'bold'}}}>
            <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default StackNavigator;