import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './Context/ThemeContext';
import AppNavigator from './Navigator/AppNavigator';
import { DataProvider } from './Context/DataContext';


const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DataProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </DataProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
