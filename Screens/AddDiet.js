import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../Context/DataContext';

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
      backgroundColor: '#d8d8f0',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#6A5ACD',
    },
    input: {
      height: 40,
      borderColor: '#6A5ACD',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: 'white',
    },
    dateInput: {
      height: 40,
      borderColor: '#6A5ACD',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#6A5ACD',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default AddDiet;