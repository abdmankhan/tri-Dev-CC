import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AuthContext } from "../context/AuthContext";

const FetchRequestsScreen = ({ navigation }) => {
  const token = useContext(AuthContext); // Access token from AuthContext

  const [requests, setRequests] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://192.168.137.1:5001/api/posts", {
          headers: {
            "Content-Type": "application/json",
            // If using token authentication, include:
            Authorization: `Bearer ${String(token.token)}`,
          },
        });
        
        
        const data = await response.data;
        setRequests(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchRequests();
  }, []);

  const toggleActions = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Helper to get color based on urgency
  const getUrgencyColor = (urgency) => {
    if (urgency === "High") return "#e74c3c";
    if (urgency === "Medium") return "#f1c40f";
    return "#2ecc71";
  };

  return (
    <LinearGradient
      colors={["#0F2027", "#203A43", "#2C5364"]}
      style={styles.container}
    >
      {/* Fixed Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-circle" size={36} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Incoming Requests</Text>
        <LottieView
          source={{
            uri: "https://assets1.lottiefiles.com/packages/lf20_t24tpvcu.json",
          }}
          autoPlay
          loop
          style={styles.animation}
        />

        {/* Request Cards */}
        {requests.map((request, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleActions(index)}
            activeOpacity={0.8}
          >
            <View style={styles.card}>
              

              <View style={styles.detailRow}>
                <Ionicons
                  name="cart-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Item: {request.description}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="cash-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>Cost: ${request.cost}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Item Location: {request.itemLocation}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="navigate-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Pickup: {request.pickupLocation}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Phone: {request.phoneNumber}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={getUrgencyColor(request.urgency)}
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Priority: {request.urgency}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Expiry: {request.expiryTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="list-outline"
                  size={18}
                  color="#dcdcdc"
                  style={styles.detailIcon}
                />
                <Text style={styles.cardDetails}>
                  Category: {request.category}
                </Text>
              </View>

              {expandedCard === index && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <AntDesign name="checkcircle" size={24} color="white" />
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineButton}>
                    <AntDesign name="closecircle" size={24} color="white" />
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollContainer: {
    padding: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  animation: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#007ACC",
    borderRadius: 25,
    padding: 25,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailIcon: {
    marginRight: 6,
  },
  cardDetails: {
    fontSize: 18,
    color: "#dcdcdc",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: "#28a745",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  declineButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
});

export default FetchRequestsScreen;
