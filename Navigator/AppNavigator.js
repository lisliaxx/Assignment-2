import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Activities from "../Screens/Activities";
import Diet from "../Screens/Diet";
import AddActivityScreen from "../Screens/AddActivities";
import EditActivityScreen from "../Screens/EditActivity";
import AddDietScreen from "../Screens/AddDiet";
import EditDietScreen from "../Screens/EditDiet";
import Settings from "../Screens/Settings";
import colors from "../Helper/Colors";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ActivitiesStackScreen = () => {
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
                name="ActivitiesList" 
                component={Activities}
                options={({ navigation }) => ({
                    title: 'Activities',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons
                                name="add"
                                size={24}
                                color={colors.textLight}
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('AddActivity')}
                            />
                            <MaterialIcons 
                                name="directions-run" 
                                size={24} 
                                color={colors.textLight}
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('AddActivity')}
                            />
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name="AddActivity"
                component={AddActivityScreen}
                options={{ title: 'Add An Activity' }}
            />
            <Stack.Screen
                name="EditActivity"
                component={EditActivityScreen}
                options={{ title: 'Edit Activity' }}
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
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons
                                name="add"
                                size={24}
                                color={colors.textLight}
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('AddDiet')}
                            />
                            <MaterialIcons 
                                name="fastfood" 
                                size={24} 
                                color={colors.textLight}
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('AddDiet')}
                            />
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name="AddDiet"
                component={AddDietScreen}
                options={{ title: 'Add A Diet Entry' }}
            />
            <Stack.Screen
                name="EditDiet"
                component={EditDietScreen}
                options={{ title: 'Edit Diet Entry' }}
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
  