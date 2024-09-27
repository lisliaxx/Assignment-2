import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";

const Activities = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Activities</Text>
    </View>
};

const Diet = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Diet</Text>
    </View>
};

const Settings = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Settings</Text>
    </View>
};


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const { isDarkMode } = useTheme();
  
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Activities') {
              iconName = 'directions-run';
            } else if (route.name === 'Diet') {
              iconName = 'fastfood';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
  
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'pink',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1c1c1c' : '#6A5ACD',
          },
          headerStyle: {
            backgroundColor: isDarkMode ? '#1c1c1c' : '#6A5ACD',
          },
          headerTintColor: '#ffffff',
        })}
      >
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Diet" component={Diet} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };
  
  export default AppNavigator;
  