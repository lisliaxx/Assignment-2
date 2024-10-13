import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../Context/DataContext';
import { useTheme } from '../Context/ThemeContext';
import colors from '../Helper/Colors';

const AddDiet = () => {
    const navigation = useNavigation();
    const { diet, setDiet } = useData();
    const { isDarkMode, backgroundColor, textColor } = useTheme();
    const [ description, setDescription ] = useState('');   
    const [ date, setDate ] = useState(new Date()); 
    const [ showDatePicker, setShowDatePicker ] = useState(false);  
    const [ calories, setCalories ] = useState(''); 

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const validate = () => {
        if (!description.trim() || !calories || isNaN(calories) || parseInt(calories) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid description and calories.');
            return;
        }

        const newDiet = {
            id: Date.now().toString(),
            description: description.trim(),
            calories: parseInt(calories),
            date: date.toDateString(),
            isSpecial: parseInt(calories) > 800,
        };

        setDiet(prevDiet => [...prevDiet, newDiet]);
        navigation.goBack();
    };

    const toggleDatePicker = () => {
        if (showDatePicker) {
            setShowDatePicker(false);
            setDate(new Date());
        } else {
            setShowDatePicker(true);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.label, { color: textColor }]}>Description *</Text>
            <TextInput
                style={[styles.input, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground, color: textColor }]}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter description"
                placeholderTextColor={isDarkMode ? colors.textLight : colors.textDark}
            />
    
            <Text style={[styles.label, { color: textColor }]}>Calories *</Text>
            <TextInput
                style={[styles.input, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground, color: textColor }]}
                onChangeText={setCalories}
                value={calories}
                keyboardType="numeric"
                placeholder="Enter calories"
                placeholderTextColor={isDarkMode ? colors.textLight : colors.textDark}
            />
    
            <Text style={[styles.label, { color: textColor }]}>Date *</Text>
            <TouchableOpacity onPress={toggleDatePicker} style={[styles.dateInput, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground }]}>
                <Text style={{ color: textColor }}>{date.toDateString()}</Text>
            </TouchableOpacity>
    
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
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primaryPurple }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primaryPurple }]} onPress={validate}>
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
});

export default AddDiet;