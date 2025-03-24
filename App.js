import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import MainStack from "./screens/MainStack";

import { AuthProvider } from "./context/AuthContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}> 
        <Text style={styles.logoText}>CampusConnect</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: styles.drawerStyle,
            drawerLabelStyle: styles.drawerLabel,
            drawerActiveTintColor: "#000",
            drawerInactiveTintColor: "#333",
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={MainStack} />
          {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  drawerStyle: {
    backgroundColor: "#ffffff",
    width: 280,
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#000",
  },
});
