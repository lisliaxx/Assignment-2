import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from '../Context/ThemeContext';
import colors from "../Helper/Colors";

const Settings = () => {
    const { isDarkMode, toggleTheme, backgroundColor, textColor } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor }]}>
          <Pressable
            style={[styles.button, { backgroundColor: colors.primaryPurple }]}
            onPress={toggleTheme}
          >
            <Text style={[styles.buttonText, { color: colors.textLight }]}>
              Toggle Theme ({isDarkMode ? 'Dark' : 'Light'})
            </Text>
          </Pressable>
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    });
      
export default Settings;