import React, { createContext, useState, useContext, useMemo } from 'react';
import colors from '../Helper/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = useMemo(() => ({
    backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
    textColor: isDarkMode ? colors.textLight : colors.textDark,
    isDarkMode,
    toggleTheme,
  }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
