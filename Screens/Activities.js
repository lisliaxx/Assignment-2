import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useData } from "../Context/DataContext";
import { useTheme } from "../Context/ThemeContext";
import ItemsList from "../Components/ItemsList";

const Activities = () => {
    const { activities } = useData();
    const { isDarkMode, backgroundColor, textColor } = useTheme();

    if (!activities?.length) {
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
                backgroundColor={backgroundColor}
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