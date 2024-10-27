import React, { useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../FireBase/FirebaseSetup';
import { MaterialIcons } from "@expo/vector-icons";
import DietForm from '../Components/DietForm';
import colors from '../Helper/Colors';

const EditDiet = ({ route, navigation }) => {
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
            "Delete",
            "Are you sure you want to delete this diet entry?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: handleDelete, style: "destructive" }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(database, 'diet', itemId));
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting diet entry:', error);
            Alert.alert('Error', 'Failed to delete diet entry. Please try again.');
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
        if (!formData.description || !formData.date || !formData.calories || 
            isNaN(formData.calories) || parseInt(formData.calories) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid description and calories.');
            return;
        }

        try {
            const dietRef = doc(database, 'diet', itemId);
            const dietData = {
                ...formData,
                updatedAt: new Date()
            };

            await updateDoc(dietRef, dietData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating diet entry:', error);
            Alert.alert('Error', 'Failed to update diet entry. Please try again.');
        }
    };

    return (
        <DietForm
            initialValues={processedItemData}
            onSubmit={confirmSave} 
            onCancel={() => navigation.goBack()}
            isEdit={true}
        />
    );
};

export default EditDiet;