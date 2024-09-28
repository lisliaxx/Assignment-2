import React from "react";
import { View, StyleSheet } from "react-native";
import { useData } from "../Context/DataContext";
import ItemsList from "../Components/ItemsList";

const Activities = () => {
    let { activities } = useData();

    return (
        <View style={styles.container}>
            <ItemsList items={activities} type="activity" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1c1c",
    },
});

export default Activities;
