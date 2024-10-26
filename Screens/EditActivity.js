import React, { useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import { MaterialIcons } from "@expo/vector-icons";
import ActivityForm from '../Components/ActivityForm';
import colors from '../Helper/Colors';

const EditActivity = ({ route, navigation }) => {
    const { itemId, itemData } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    onPress={confirmDelete}
                    style={{ marginRight: 15 }}
                >
                    <MaterialIcons 
                        name="delete" 
                        size={24} 
                        color={colors.textLight}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const confirmDelete = () => {
        Alert.alert(
            "Delete Activity",
            "Are you sure you want to delete this activity?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    onPress: handleDelete,
                    style: "destructive"
                }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(database, 'activities', itemId));
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting activity:', error);
            Alert.alert('Error', 'Failed to delete activity. Please try again.');
        }
    };

    const handleSubmit = async (formData) => {
        if (!formData.type || !formData.date || !formData.duration || 
            isNaN(formData.duration) || parseInt(formData.duration) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid activity type and duration.');
            return;
        }

        try {
            const activityRef = doc(database, 'activities', itemId);
            const activityData = {
                type: formData.type,
                duration: parseInt(formData.duration),
                date: formData.date,
                isSpecial: formData.isSpecial,
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