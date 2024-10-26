import React from 'react';
import { Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import ActivityForm from '../Components/ActivityForm';

const EditActivity = ({ route, navigation }) => {
    const { itemId, itemData } = route.params;

    const handleSubmit = async (formData) => {
        if (!formData.type || !formData.date || !formData.duration || 
            isNaN(formData.duration) || parseInt(formData.duration) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
            return;
        }

        try {
            const activityRef = doc(database, 'activities', itemId);
            const duration = parseInt(formData.duration);
            const activityData = {
                type: formData.type,
                duration: parseInt(formData.duration),
                date: formData.date,
                isSpecial: formData.removeSpecial ? false : 
                (formData.type === 'Running' && duration > 60) || 
                (formData.type === 'Weights' && duration > 60),
                updatedAt: new Date()
            };

            await updateDoc(activityRef, activityData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating activity:', error);
            Alert.alert('Error', 'Failed to update activity. Please try again.');
        }
    };

    return (
        <ActivityForm
            initialValues={itemData}
            onSubmit={handleSubmit}
            onCancel={() => navigation.goBack()}
            isEdit={true}
        />
    );
};

export default EditActivity;