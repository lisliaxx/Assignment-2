import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useData } from "../Context/DataContext";
import { useTheme } from "../Context/ThemeContext";
import ItemsList from "../Components/ItemsList";

const Diet = () => {
    const { diet } = useData();
    const { isDarkMode, backgroundColor, textColor } = useTheme();

    if (!diet?.length) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={{ color: textColor }}>No diet entries available</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ItemsList 
                items={diet}
                type="diet"
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

export default Diet;