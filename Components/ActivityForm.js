import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from '../Context/ThemeContext';
import colors from '../Helper/Colors';

const ActivityForm = ({ 
    initialValues = {}, 
    onSubmit, 
    onCancel,
    isEdit = false 
}) => {
    const { isDarkMode, backgroundColor, textColor } = useTheme();
    
    const [activityType, setActivityType] = useState(initialValues.type || null);
    const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date) : new Date());
    const [duration, setDuration] = useState(initialValues.duration?.toString() || '');
    const [removeSpecial, setRemoveSpecial] = useState(false);
    
    // UI state
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

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const validate = () => {
        if (!activityType || !date || !duration || isNaN(duration) || parseInt(duration) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
            return false;
        }
        return true;
    };
    const handleSubmit = () => {
        if (!validate()) return;
    
        const durationValue = parseInt(duration);
        const activityData = {
            type: activityType,
            duration: durationValue,
            date: date,
            isSpecial: isEdit && initialValues.isSpecial ? 
                !removeSpecial : 
                ((activityType === 'Running' && durationValue > 60) || 
                 (activityType === 'Weights' && durationValue > 60))
        };
    
        onSubmit(activityData);
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
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
                        borderColor: colors.primaryPurple,
                    }]}
                    dropDownContainerStyle={[styles.dropdownContainer, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
                        borderColor: colors.primaryPurple,
                    }]}
                    placeholder='Select An Activity'
                    placeholderStyle={{ color: textColor }}
                    textStyle={{ color: textColor }}
                />

                <Text style={[styles.label, { color: textColor }]}>Duration (min) *</Text>
                <TextInput
                    style={[styles.input, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
                        borderColor: colors.primaryPurple,
                        color: textColor 
                    }]}
                    onChangeText={setDuration}
                    value={duration}
                    keyboardType="numeric"
                    placeholder="Enter duration"
                    placeholderTextColor={textColor}
                />

                <Text style={[styles.label, { color: textColor }]}>Date *</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View style={[styles.input, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
                        borderColor: colors.primaryPurple,
                    }]}>
                        <Text style={{ color: textColor }}>{date.toDateString()}</Text>
                    </View>
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


                {isEdit && initialValues.isSpecial && (
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
                                <MaterialIcons 
                                    name="check" 
                                    size={20} 
                                    color={colors.textLight}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSubmit}
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
        padding: 15, 
    },
    formContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16, 
        fontWeight: '600',
        marginBottom: 4, 
        marginTop: 8, 
    },
    input: {
        height: 45, 
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12, 
        marginBottom: 8, 
        justifyContent: 'center',
    },
    specialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 10,
        paddingHorizontal: 4,
    },
    specialText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 20,
        color: colors.textDark,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: colors.primaryPurple,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    checkboxChecked: {
        backgroundColor: colors.primaryPurple,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10, 
        gap: 12, 
    },
    cancelButton: {
        flex: 1,
        height: 45, 
        backgroundColor: colors.error,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    saveButton: {
        flex: 1,
        height: 45, 
        backgroundColor: colors.primaryPurple,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: colors.textLight,
        fontSize: 15, 
        fontWeight: '600',
    },
});

export default ActivityForm;