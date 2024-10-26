import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
                    zIndex={3000}
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
                <TouchableOpacity 
                    onPress={() => setShowDatePicker(true)}
                >
                    <View style={[styles.input, { 
                        backgroundColor: isDarkMode ? colors.darkModeBackground : colors.lightModeBackground,
                        borderColor: colors.primaryPurple,
                    }]}>
                        <Text style={{ color: textColor }}>{date.toDateString()}</Text>
                    </View>
                </TouchableOpacity>

                {isEdit && initialValues.isSpecial && (
                    <View style={styles.specialContainer}>
                        <Text style={[styles.specialText, { color: textColor }]}>
                            This item is marked as special. Select the checkbox to remove the special status.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.checkbox, removeSpecial && styles.checkboxChecked]}
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

            <View style={styles.buttonRow}>
                <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => onSubmit({ type: activityType, duration, date, removeSpecial })}
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
    },
    formContainer: {
        flex: 1,
        padding: 20,
        zIndex: 1000,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        justifyContent: 'center',
    },
    specialContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        gap: 15,
    },
    specialText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
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
    buttonRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 10,
        backgroundColor: 'white',
        zIndex: 1,
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        height: 50,
        backgroundColor: colors.error,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        flex: 1,
        height: 50,
        backgroundColor: colors.primaryPurple,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.textLight,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ActivityForm;