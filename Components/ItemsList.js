import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ItemsList = ({ items, type }) => {
    let renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemType}>{type === 'activity' ? item.type : item.description}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemDate}>{item.date}</Text>
          <Text style={styles.itemValue}>
            {type === 'activity' ? `${item.duration} min` : `${item.calories} cal`}
          </Text>
        </View>
        {((type === 'activity' && (item.type === 'Running' || item.type === 'Weights') && item.duration > 60) ||
          (type === 'diet' && item.calories > 800)) && (
          <Text style={styles.specialIcon}>⚠️</Text>
        )}
      </View>
    );

    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    );
    };
  
  const styles = StyleSheet.create({
    list: {
      width: '100%',
    },
    item: {
      backgroundColor: '#6A5ACD',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    itemType: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    itemDate: {
      color: 'white',
    },
    itemDuration: {
      color: 'white',
    },
    specialIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  });
  
  export default ItemsList;