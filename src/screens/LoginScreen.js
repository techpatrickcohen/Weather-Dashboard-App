import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            // Firebase sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Logged in successfully!");
            navigation.navigate('Dashboard');
        } catch (error) {
            // Handle specific Firebase error codes
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
                Alert.alert("Error", "Invalid credentials");
            } else {
                Alert.alert("Error", error.message);
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>⛅ Weather Dashboard</Text>
            <TextInput
                placeholder="Email"
                color="black"
                placeholderTextColor="gray"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                color="black"
                placeholderTextColor="gray"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Submit" onPress={handleLogin} />


            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate('Signup')} style={styles.footerLink}>Sign up</Text></Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        //backgroundColor: 'white',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center',
        color:'black'
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    link: {
        color: '#1e90ff',
        marginTop: 15,
        textAlign: 'center',
    },
    footerView: {
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: '#1e90ff',
        fontWeight: "bold",
        fontSize: 16
    }
});
