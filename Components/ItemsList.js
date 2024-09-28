import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../Helper/Colors";

const ItemsList = ({ items, type, textColor, backgroundColor }) => {
  const renderItem = ({ item }) => (
      <View style={[styles.item, { backgroundColor: colors.primaryPurple }]}>
          <Text style={[styles.itemText, { color: colors.textLight }]}>
              {type === 'activity' ? item.type : item.description}
          </Text>
          <View style={styles.itemDetails}>
            <Text style={[styles.itemText, { color: colors.textLight }]}>{item.date}</Text>
            <Text style={[styles.itemText, { color: colors.textLight }]}>
                {type === 'activity' ? `${item.duration} min` : `${item.calories} cal`}
            </Text>
          </View>
          {item.isSpecial && <Text style={styles.specialIcon}>⚠️</Text>}
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
  specialIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 20,
  },
});

export default ItemsList;