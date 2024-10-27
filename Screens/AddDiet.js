import React from 'react';
import { Alert } from 'react-native';
import { writeToDB } from '../FireBase/FirebaseHelper';
import DietForm from '../Components/DietForm';

const AddDiet = ({ navigation }) => {
    const handleSubmit = async (formData) => {
        try {
            await writeToDB({
                ...formData,
                createdAt: new Date()
            }, 'diet');
            navigation.goBack();
        } catch (error) {
            console.error("Error adding diet entry:", error);
            Alert.alert('Error', 'Failed to save diet entry. Please try again.');
        }
    };

    return (
        <DietForm
            onSubmit={handleSubmit}
            onCancel={() => navigation.goBack()}
        />
    );
};

export default AddDiet;