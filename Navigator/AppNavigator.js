import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Activities from "../Screens/Activities";
import Diet from "../Screens/Diet";
import AddActivityScreen from "../Screens/AddActivities";

const Settings = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Settings</Text>
    </View>
};


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ActivitiesStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#6A5ACD',
            },
            headerTintColor: '#ffffff',
        }}>

        <Stack.Screen 
            name="Activities" 
            component={Activities}
            options={({ navigation }) => ({
                headerRight: () => (
                    <MaterialIcons name="add" size={24} color="#ffffff" style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddActivity')} />
                ),
            })}

             />
        <Stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{ title: 'Add An Activity' }}
        />
    </Stack.Navigator>
);

const AppNavigator = () => {

    const { isDarkMode } = useTheme();
  
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
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
        <Tab.Screen 
            name="Activities" 
            component={ActivitiesStack}
            options={{ headerShown: false }}
        />
        <Tab.Screen 
            name="Diet" 
            component={Diet}
            options={{
                headerRight: () => (
                <MaterialIcons name="add" size={24} color="#ffffff" style={{ marginRight: 15 }} />
                ),
            }} 
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };
  
  export default AppNavigator;
  