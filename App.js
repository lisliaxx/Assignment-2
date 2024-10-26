import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './Context/ThemeContext';
import { DataProvider } from './Context/DataContext';
import AppNavigator from './Navigator/AppNavigator';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <DataProvider>
                    <NavigationContainer>
                        <AppNavigator />
                    </NavigationContainer>
                </DataProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

export default App;