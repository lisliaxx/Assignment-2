import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../Context/DataContext'; 
import colors from '../Helper/Colors';

const AddActivities = () => {
    const navigation = useNavigation();
    const { activities, setActivities } = useData();
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

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const validate = () => {
        if (!activityType || !date || !duration) {
            Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
            return; 
        }

        const newActivity = {
            id: Date.now().toString(),
            type: activityType,
            duration: parseInt(duration),
            date: date.toDateString(),
            isSpecial: (activityType === 'Running' || activityType === 'Weights') && duration > 60,
        };

        setActivities([...activities, newActivity]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Activity *</Text>
          <DropDownPicker
            open={open}
            value={activityType}
            items={items}
            setOpen={setOpen}
            setValue={setActivityType}
            setItems={setItems}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder='Select An Activity'
          />
    
          <Text style={styles.label}>Duration (min) *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDuration}
            value={duration}
            keyboardType="numeric"
            placeholder="Enter duration"
          />
    
          <Text style={styles.label}>Date *</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
    
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="inline"
              onChange={onDateChange}
            />
          )}
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={validate}>
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
          backgroundColor: colors.lightPurple,
        },
        label: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 5,
          color: colors.primaryPurple,
        },
        input: {
          height: 40,
          borderColor: colors.inputBorder,
          borderWidth: 1,
          marginBottom: 15,
          paddingHorizontal: 10,
          backgroundColor: colors.inputBackground,
        },
        dateInput: {
          height: 40,
          borderColor: colors.inputBorder,
          borderWidth: 1,
          marginBottom: 15,
          paddingHorizontal: 10,
          justifyContent: 'center',
          backgroundColor: colors.inputBackground,
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        },
        button: {
          backgroundColor: colors.primaryPurple,
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

