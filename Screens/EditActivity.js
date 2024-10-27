import React, { useEffect } from 'react';
import { Alert, Pressable } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import { MaterialIcons } from "@expo/vector-icons";
import ActivityForm from '../Components/ActivityForm';
import colors from '../Helper/Colors';

const EditActivity = ({ route, navigation }) => {
    const { itemId, itemData } = route.params;

    const processedItemData = {
        ...itemData,
        date: new Date(itemData.date),
        createdAt: itemData.createdAt ? new Date(itemData.createdAt) : null,
        updatedAt: itemData.updatedAt ? new Date(itemData.updatedAt) : null
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={confirmDelete}
                    style={{ marginRight: 15 }}
                >
                    <MaterialIcons 
                        name="delete" 
                        size={24} 
                        color={colors.textLight}
                    />
                </Pressable>
            ),
        });
    }, [navigation]);
    

    const confirmDelete = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this activity?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: handleDelete, style: "destructive" }
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

    const confirmSave = (formData) => {
        Alert.alert(
            "Important",
            "Are you sure you want to save these changes?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Save", 
                    onPress: () => handleSubmit(formData),
                    style: "default"
                }
            ]
        );
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
            initialValues={processedItemData}
            onSubmit={confirmSave}  
            onCancel={() => navigation.goBack()}
            isEdit={true}
        />
    );
};

export default EditActivity;