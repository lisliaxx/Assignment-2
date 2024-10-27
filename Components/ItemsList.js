import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from "../Helper/Colors";

const ItemsList = ({ items, type, textColor, backgroundColor }) => {
    const navigation = useNavigation();

    const handleItemPress = (item) => {
        const serializableItem = {
            ...item,
            date: item.date instanceof Date ? item.date.toISOString() : item.date,
            ...(item.createdAt && {
                createdAt: item.createdAt instanceof Date ? 
                    item.createdAt.toISOString() : 
                    item.createdAt
            }),
            ...(item.updatedAt && {
                updatedAt: item.updatedAt instanceof Date ? 
                    item.updatedAt.toISOString() : 
                    item.updatedAt
            })
        };

        const screenName = type === 'activity' ? 'EditActivity' : 'EditDiet';
        navigation.navigate(screenName, {
            itemId: item.id,
            itemData: serializableItem
        });
    };

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={[styles.item, { backgroundColor: colors.primaryPurple }]}
            >
                <Text style={[styles.itemText, { color: colors.textLight }]}>
                    {type === 'activity' ? item.type : item.description}
                </Text>
                <View style={styles.itemDetails}>
                    <Text style={[styles.itemText, { color: colors.textLight }]}>
                        {item.date}
                    </Text>
                    <Text style={[styles.itemText, { color: colors.textLight }]}>
                        {type === 'activity' ? `${item.duration} min` : `${item.calories} cal`}
                    </Text>
                </View>
                {item.isSpecial && (
                    <TouchableOpacity 
                        style={styles.specialIconContainer}
                        onPress={() => handleItemPress(item)}
                    >
                        <Text style={styles.specialIcon}>⚠️</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={[styles.list, { backgroundColor }]}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 16,
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    specialIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5, 
    },
    specialIcon: {
        fontSize: 20,
    },
});

export default ItemsList;