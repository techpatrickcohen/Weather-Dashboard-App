import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignupScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('Dashboard');
    } catch (error) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        Alert.alert("Error", "Invalid credentials");
      } else if (error.code === 'auth/weak-password'){
        Alert.alert("Error", "Password should be at least 6 characters.");
      } else{

      }
    }


  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        color="black"
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        color="black"
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />

      <View style={styles.footerView}>
        <Text style={styles.footerText}>Already have an account?<Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}>Login</Text></Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    //backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'black'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
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
