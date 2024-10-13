import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Activities from "../Screens/Activities";
import Diet from "../Screens/Diet";
import AddActivityScreen from "../Screens/AddActivities";
import AddDietScreen from "../Screens/AddDiet";
import Settings from "../Screens/Settings";
import colors from "../Helper/Colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ActivitiesStackScreen = () => {
    const { backgroundColor, textColor } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryPurple,
                },
                headerTintColor: colors.textLight,
                contentStyle: { backgroundColor},
            }}>

            <Stack.Screen 
                name="ActivitiesList" 
                component={Activities}
                options={({ navigation }) => ({
                    title: 'Activities',
                    headerRight: () => (
                        <MaterialIcons name="add" size={24} color={colors.textLight} style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddActivity')} />
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
};

const DietStackScreen = () => {
    const { backgroundColor, textColor } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryPurple,
                },
                headerTintColor: colors.textLight,
                contentStyle: { backgroundColor },
            }}>

            <Stack.Screen 
                name="DietList" 
                component={Diet}
                options={({ navigation }) => ({
                    title: 'Diet',
                    headerRight: () => (
                        <MaterialIcons name="add" size={24} color={colors.textLight} style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddDiet')} />
                    ),
                })}
                />
            <Stack.Screen
                name="AddDiet"
                component={AddDietScreen}
                options={{ title: 'Add A Diet' }}
            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {

    const { isDarkMode, backgroundColor, textColor } = useTheme();
  
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
          tabBarActiveTintColor: isDarkMode ? colors.tabBarActive : colors.primaryPurple,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
            },
            headerStyle: {
                backgroundColor: colors.primaryPurple,
            },
            headerTintColor: colors.textLight,
        })}
        >
        <Tab.Screen 
            name="Activities" 
            component={ActivitiesStackScreen}
            options={{ headerShown: false }}
        />
        <Tab.Screen 
            name="Diet" 
            component={DietStackScreen}
            options={{ headerShown: false }}
        />
        <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{
                headerStyle: {
                    backgroundColor: colors.primaryPurple,
                },
                headerTintColor: colors.textLight,
            }}
        />
      </Tab.Navigator>
    );
  };
  
  export default AppNavigator;
  