import React from 'react';
import { Alert } from 'react-native';
import { writeToDB } from '../FireBase/FirebaseHelper';
import ActivityForm from '../Components/ActivityForm';

const AddActivity = ({ navigation }) => {
    const handleSubmit = async (formData) => {
      if (!formData.type || !formData.date || !formData.duration || 
          isNaN(formData.duration) || parseInt(formData.duration) <= 0) {
          Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
          return;
      }
        
        const duration = parseInt(formData.duration);
        const activityData = {
            type: formData.type,
            duration: parseInt(formData.duration),
            date: formData.date,
            isSpecial: (formData.type === 'Running' && duration > 60) || 
            (formData.type === 'Weights' && duration > 60),
            createdAt: new Date()
        };

        try {
            await writeToDB(activityData, 'activities');
            navigation.goBack();
        } catch (error) {
            console.error("Error adding activity:", error);
            Alert.alert('Error', 'Failed to save activity. Please try again.');
        }
    };

    return (
        <ActivityForm
            onSubmit={handleSubmit}
            onCancel={() => navigation.goBack()}
        />
    );
};

export default AddActivity;