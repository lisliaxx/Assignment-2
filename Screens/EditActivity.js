import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import { useTheme } from '../Context/ThemeContext';
import colors from '../Helper/Colors';

const EditActivity = ({ route, navigation }) => {
    const { itemId, itemData } = route.params;
    const { isDarkMode, backgroundColor, textColor } = useTheme();
    const [activityType, setActivityType] = useState(itemData.type);
    const [date, setDate] = useState(new Date(itemData.date));
    const [duration, setDuration] = useState(itemData.duration.toString());
    const [removeSpecial, setRemoveSpecial] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Walking', value: 'Walking' },
        { label: 'Running', value: 'Running' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Weights', value: 'Weights' },
        { label: 'Yoga', value: 'Yoga' },
        { label: 'Cycling', value: 'Cycling' },
        { label: 'Hiking', value: 'Hiking' },
    ]);

    useEffect(() => {
        navigation.setOptions({
            title: 'Edit',
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

    const saveChanges = async () => {
        if (!activityType || !date || !duration || isNaN(duration) || parseInt(duration) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
            return;
        }

        setLoading(true);
        try {
            const activityRef = doc(database, 'activities', itemId);
            const activityData = {
                type: activityType,
                duration: parseInt(duration),
                date: date,
                isSpecial: removeSpecial ? false : 
                    (parseInt(duration) > 60 || activityType === 'Running' || activityType === 'Weights'),
                updatedAt: new Date()
            };

            await updateDoc(activityRef, activityData);
            
            navigation.goBack();
        } catch (error) {
            console.error('Error updating activity:', error);
            Alert.alert('Error', 'Failed to update activity. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = () => {
        const message = removeSpecial 
            ? "This will remove the special status from this activity. Are you sure?"
            : "Are you sure you want to update this activity?";
            
        Alert.alert(
            "Important",
            message,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Update", onPress: saveChanges }
            ]
        );
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Activity",
            "Are you sure you want to delete this activity?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: handleDelete, style: "destructive" }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(database, 'activities', itemId));
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting activity:', error);
            Alert.alert('Error', 'Failed to delete activity. Please try again.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.formContainer}>
                <Text style={[styles.label, { color: textColor }]}>Activity *</Text>
                <DropDownPicker
                    open={open}
                    value={activityType}
                    items={items}
                    setOpen={setOpen}
                    setValue={setActivityType}
                    setItems={setItems}
                    style={[styles.input, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground 
                    }]}
                    dropDownContainerStyle={[styles.dropdownContainer, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground 
                    }]}
                    placeholder='Select An Activity'
                    placeholderStyle={{ color: isDarkMode ? colors.textLight : colors.textDark }}
                    textStyle={{ color: isDarkMode ? colors.textLight : colors.textDark }}
                />

                <Text style={[styles.label, { color: textColor }]}>Duration (min) *</Text>
                <TextInput
                    style={[styles.input, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground,
                        color: textColor 
                    }]}
                    onChangeText={setDuration}
                    value={duration}
                    keyboardType="numeric"
                    placeholder="Enter duration"
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
                        <Text style={[styles.specialText, { color: textColor }]}>
                            This item is marked as special. Select the checkbox to remove the special status.
                        </Text>
                        <TouchableOpacity 
                            style={[
                                styles.checkbox,
                                removeSpecial && styles.checkboxChecked
                            ]}
                            onPress={() => setRemoveSpecial(!removeSpecial)}
                        >
                            {removeSpecial && (
                                <MaterialIcons name="check" size={20} color={colors.textLight} />
                            )}
                        </TouchableOpacity>
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
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: colors.error }]} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: colors.primaryPurple }]} 
                    onPress={handleUpdate}
                >
                    <Text style={styles.buttonText}>Save</Text>
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
    formContainer: {
        flex: 1,
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
    specialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        gap: 10,
    },
    specialText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors.primaryPurple,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primaryPurple,
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
});

export default EditActivity;