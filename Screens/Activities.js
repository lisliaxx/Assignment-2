import React from "react";
import { View, StyleSheet } from "react-native";
import { useData } from "../Context/DataContext";
import { useTheme } from "../Context/ThemeContext";
import ItemsList from "../Components/ItemsList";
import colors from "../Helper/Colors";

const Activities = () => {
    const { activities } = useData() || { activities: [] };
    const { isDarkMode, backgroundColor, textColor } = useTheme();

    if (!activities) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={{ color: textColor }}>No activities available</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ItemsList 
                items={activities} 
                type="activity" 
                textColor={textColor} 
                backgroundColor={isDarkMode ? colors.darkModeBackground : colors.lightModeBackground}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,     
    },
});

export default Activities;
