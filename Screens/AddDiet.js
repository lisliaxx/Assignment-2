import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../Context/DataContext';
import colors from '../Helper/Colors';

const AddDiet = () => {
    const navigation = useNavigation();
    const { diet, setDiet } = useData();
    const [ description, setDescription ] = useState('');   
    const [ date, setDate ] = useState(new Date()); 
    const [ showDatePicker, setShowDatePicker ] = useState(false);  
    const [ calories, setCalories ] = useState(''); 

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
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

        setDiet([...diet, newDiet]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Enter description"
          />
    
          <Text style={styles.label}>Calories *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCalories}
            value={calories}
            keyboardType="numeric"
            placeholder="Enter calories"
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
export default AddDiet;