import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import { useTheme } from '../Context/ThemeContext';
import colors from '../Helper/Colors';

const EditDiet = ({ route, navigation }) => {
    const { itemId, itemData } = route.params;
    const { isDarkMode, backgroundColor, textColor } = useTheme();
    const [description, setDescription] = useState(itemData.description);
    const [date, setDate] = useState(new Date(itemData.date));
    const [calories, setCalories] = useState(itemData.calories.toString());
    const [isSpecial, setIsSpecial] = useState(itemData.isSpecial);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={confirmDelete}>
                    <MaterialIcons 
                        name="delete" 
                        size={24} 
                        color={colors.textLight}
                        style={{ marginRight: 15 }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Diet Entry",
            "Are you sure you want to delete this diet entry?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: handleDelete, style: "destructive" }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(database, 'diet', itemId));
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting diet entry:', error);
            Alert.alert('Error', 'Failed to delete diet entry. Please try again.');
        }
    };

    const handleUpdate = () => {
        Alert.alert(
            "Update Diet Entry",
            "Are you sure you want to update this entry?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Update", onPress: saveChanges }
            ]
        );
    };

    const saveChanges = async () => {
        if (!description.trim() || !calories || isNaN(calories) || parseInt(calories) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid description and calories.');
            return;
        }

        setLoading(true);
        try {
            const dietRef = doc(database, 'diet', itemId);
            const dietData = {
                description: description.trim(),
                calories: parseInt(calories),
                date: date,
                isSpecial: isSpecial && parseInt(calories) > 800,
                updatedAt: new Date()
            };

            await updateDoc(dietRef, dietData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating diet entry:', error);
            Alert.alert('Error', 'Failed to update diet entry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.label, { color: textColor }]}>Description *</Text>
            <TextInput
                style={[styles.input, { 
                    backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground,
                    color: textColor 
                }]}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter description"
                placeholderTextColor={isDarkMode ? colors.textLight : colors.textDark}
            />

            <Text style={[styles.label, { color: textColor }]}>Calories *</Text>
            <TextInput
                style={[styles.input, { 
                    backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground,
                    color: textColor 
                }]}
                onChangeText={setCalories}
                value={calories}
                keyboardType="numeric"
                placeholder="Enter calories"
                placeholderTextColor={isDarkMode ? colors.textLight : colors.textDark}
            />

            <Text style={[styles.label, { color: textColor }]}>Date *</Text>
            <TouchableOpacity 
                onPress={() => setShowDatePicker(true)}
                style={[styles.dateInput, { 
                    backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground 
                }]}
            >
                <Text style={{ color: textColor }}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {itemData.isSpecial && (
                <View style={styles.specialContainer}>
                    <Text style={[styles.label, { color: textColor }]}>Keep as Special</Text>
                    <Switch
                        value={isSpecial}
                        onValueChange={setIsSpecial}
                        trackColor={{ false: colors.tabBarInactive, true: colors.primaryPurple }}
                    />
                </View>
            )}

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                    textColor={textColor}
                />
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: colors.primaryPurple }]} 
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { 
                        backgroundColor: loading ? colors.tabBarInactive : colors.primaryPurple 
                    }]} 
                    onPress={handleUpdate}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Saving...' : 'Save'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: colors.inputBorder,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    dateInput: {
        height: 40,
        borderColor: colors.inputBorder,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textLight,
        fontWeight: 'bold',
    },
    specialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
});

export default EditDiet;