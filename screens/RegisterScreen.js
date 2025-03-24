import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://192.168.137.1:5001/api/auth/signup",
        { name, email, password }
      );
      
      console.log(response.data);
      if (response.data) {
        Alert.alert("Registration Successful", "Please login now");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Registration Failed",
          response.data.message || "An error occurred"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  return (
    <LinearGradient
      colors={["#1A1A2E", "#16213E", "#0F3460"]}
      style={styles.container}
    >
      {/* Lottie Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={{ uri: "https://assets5.lottiefiles.com/packages/lf20_gctv39iy.json" }}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      </View>

      {/* Title */}
      <Text style={styles.heading}>Create Your Account</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter Email or Phone Number"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomTextContainer}>
        <Text style={{ color: "#fff" }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}> Login</Text>
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
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: "center",
  },
  lottieStyle: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#2C2C54",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#FB2576",
    marginLeft: 5,
    fontWeight: "600",
  },
});
