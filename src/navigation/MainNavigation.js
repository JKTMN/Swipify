import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ThemeContext from '../context/ThemeContext';
import GameScreen from '../screens/GameScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import EditPlaylistDetailsScreen from '../screens/EditPlaylistDetails';
import { UserContext } from '../context/UserDetailsContext';
import PlaylistDetailsScreen from '../screens/PlaylistDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const { theme } = useContext(ThemeContext);
    const { profilePicture } = useContext(UserContext);

    const pfp = profilePicture;

    return (
        <Tab.Navigator 
        screenOptions={{ tabBarActiveTintColor: '#1ED750', 
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
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />, 
            headerTitleAlign: 'center', 
            headerStyle: {height: 120, backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7'},
            headerTitle: () => (
                <Image 
                  source={require('../../assets/logo/swipifylogo.png')} 
                  style={{ width: 200, height: 120, }}
                  resizeMode="contain" 
                />
            )
        }}/>
            <Tab.Screen name="Playlists" 
            component={PlaylistScreen} 
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons 
            name="playlist-music-outline" size={30} color={color} />, 
            headerTitleAlign: 'center', 
            headerShown: true,
            headerStyle: {backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7', height: 100},
            headerLeft: () => (
                <Image 
                  source={require('../../assets/logo/swipifylogoCropped.png')}
                  style={{ width: 30, height: 35, marginLeft: 20 }}
                />
            )}}/>
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
                headerStyle: {backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7', height: 110}, 
                headerTintColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitle: () => (
                    <Image 
                      source={require('../../assets/logo/swipifylogo.png')} 
                      style={{ width: 200, height: 100, }}
                      resizeMode="contain" 
                    />
                )}}/>
            <Stack.Screen name="EditPlaylistDetails" component={EditPlaylistDetailsScreen} options={{
                headerStyle: {backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7'}, 
                headerTintColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                }}/>
            <Stack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} options={{
                headerStyle: {backgroundColor: theme === 'dark' ? '#1F1F1F' : '#F7F7F7'},
                headerTintColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}/>
        </Stack.Navigator>
    );
}

export default StackNavigator;