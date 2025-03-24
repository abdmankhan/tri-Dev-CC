import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import {Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.137.1:5001/api/auth/login",
        { email, password }
      );

      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        login(response.data.token);
        navigation.navigate("Home");
      } else {
        Alert.alert("Login failed", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in");
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={["#0F2027", "#203A43", "#2C5364"]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Ionicons name="arrow-back-circle" size={36} color="#fff" />
      </TouchableOpacity>
      {/* Updated Lottie Animation for Login */}

      <View style={styles.animationContainer}>
        <LottieView
          source={{ uri: 'https://lottie.host/7f7ea3cb-11cd-4d8f-bfb6-7827fdb3aaeb/jBAJf9OWjU.json' }}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      </View>

      {/* Title */}
      <Text style={styles.heading}>Login To Your Account</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Email or Phone Number"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomTextContainer}>
        <Text style={{ color: '#fff' }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}> Signup</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: 'center',
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 50,
  },
  lottieStyle: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#2C2C54',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  forgotText: {
    color: '#F0A500',
    textAlign: 'right',
    marginTop: -10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FB2576',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#FFC107',
    marginLeft: 5,
    fontWeight: '600',
  },
});
