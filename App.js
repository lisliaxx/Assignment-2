import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './Context/ThemeContext';
import { DataProvider } from './Context/DataContext';
import AppNavigator from './Navigator/AppNavigator';


const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
