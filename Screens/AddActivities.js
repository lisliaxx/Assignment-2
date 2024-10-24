import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { writeToDB } from '../FireBase/FirebaseHelper';
import { useData } from '../Context/DataContext';
import { useTheme } from '../Context/ThemeContext';
import colors from '../Helper/Colors';

const AddActivities = () => {
    const navigation = useNavigation();
    const { activities, setActivities } = useData();
    const { isDarkMode, backgroundColor, textColor } = useTheme();
    const [ activityType, setActivityType ] = useState(null);
    const [ date, setDate ] = useState(new Date());
    const [ duration, setDuration ] = useState(''); 
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ items, setItems ] = useState([
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

    const validate = async () => {
      if (!activityType || !date || !duration || isNaN(duration) || parseInt(duration) <= 0) {
          Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
          return;
      }

        const newActivity = {
          type: activityType,
          duration: parseInt(duration),
          date: date, 
          isSpecial: parseInt(duration) > 60 || activityType === 'Running' || activityType === 'Weights',
          createdAt: new Date()
      };

      try {
          await writeToDB(newActivity, 'activities');
          navigation.goBack();
      } catch (error) {
          console.error("Error adding activity:", error);
          Alert.alert('Error', 'Failed to save activity. Please try again.');
      }
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
          <Text style={[styles.label, { color: textColor }]}>Activity *</Text>
          <DropDownPicker
            open={open}
            value={activityType}
            items={items}
            setOpen={setOpen}
            setValue={setActivityType}
            setItems={setItems}
            style={[styles.dropdown, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground }]}
            dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground }]}
            placeholder='Select An Activity'
            placeholderStyle={{ color: isDarkMode ? colors.textLight : colors.textDark }}
            textStyle={{ color: isDarkMode ? colors.textLight : colors.textDark }}
          />
    
          <Text style={[styles.label, { color: textColor }]}>Duration (min) *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? colors.darkModeBackground : colors.inputBackground, color: textColor }]}
            onChangeText={setDuration}
            value={duration}
            keyboardType="numeric"
            placeholder="Enter duration"
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

export default AddActivities;

