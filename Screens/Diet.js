import React from "react";
import { View, StyleSheet } from "react-native";
import { useData } from "../Context/DataContext";
import ItemsList from "../Components/ItemsList";

const Diet = () => {
    let { diet } = useData();

    return (
        <View style={styles.container}>
            <ItemsList items={diet} type="diet" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Diet;
