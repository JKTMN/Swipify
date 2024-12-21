import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';

const LoginScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
            },
            card: {
                width: '90%',
                height: '50%',
                backgroundColor: theme === 'dark' ? '#F5F5F5' : '#363636',
                alignSelf: 'center',
                borderRadius: 30,
                padding: 20,
                justifyContent: 'space-around',
            },
            header: {
                alignSelf: 'center',
                color: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
                fontSize: 26,
                fontWeight: 'bold',
                marginBottom: 20,
            },
            input: {
                height: 50,
                borderColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 15,
                paddingHorizontal: 15,
                color: '#fff',
            },
            button: {
                backgroundColor: '#4CAF50',
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 20,
            },
            buttonText: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
            },
            loginBtn: {
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 15,
            },
            loginBtnText: {
                color: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
            },
        });
    
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.header}>Login</Text>
    
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor={theme === 'dark' ? '#2B2B2B' : '#FCFCFC'}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={theme === 'dark' ? '#2B2B2B' : '#FCFCFC'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
    
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginBtnText}>Or sign up here</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
}

export default LoginScreen;