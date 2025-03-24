import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function HomeScreen({ navigation }) {
  // Helper function to check for token before navigating.
  const handleNavigation = async (screen) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.navigate("Login");
      } else {
        navigation.navigate(screen);
      }
    } catch (error) {
      console.error("Error checking login", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  // Profile button navigation can be similar if you want to enforce login there as well.
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.navigate("Login");
      } else {
        navigation.navigate("UserProfile");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch profile");
    }
  };

  return (
    <LinearGradient
      colors={["#0F2027", "#203A43", "#2C5364"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Online Lottie Animation */}
      <LottieView
        source={{
          uri: "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json",
        }}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Heading and Subtitle */}
      <Text style={styles.title}>Campus Connect</Text>
      <Text style={styles.subtitle}>
        Helping students connect and deliver essentials seamlessly.
      </Text>

      {/* Add Request Button */}
      <TouchableOpacity
        style={styles.addRequestButton}
        onPress={() => handleNavigation("AddRequest")}
      >
        <LinearGradient
          colors={["#DA4453", "#89216B", "#6E48AA"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Add Request</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Fetch Requests Button */}
      <TouchableOpacity
        style={styles.fetchRequestButton}
        onPress={() => handleNavigation("FetchRequests")}
      >
        <LinearGradient
          colors={["#00B4DB", "#0083B0", "#005C97"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Fetch Requests</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Menu and Profile Icons */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={fetchProfile}>
        <Ionicons name="person-circle" size={28} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#F5F7FA",
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C4E0E5",
    marginVertical: 15,
    textAlign: "center",
    paddingHorizontal: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 6,
  },
  addRequestButton: {
    marginTop: 25,
    width: "85%",
    borderRadius: 35,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#DA4453",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  fetchRequestButton: {
    marginTop: 20,
    width: "85%",
    borderRadius: 35,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#00B4DB",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#F5F7FA",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1.5,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 8,
  },
  menuButton: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  profileButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
