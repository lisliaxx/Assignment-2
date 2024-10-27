import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { database } from "../FireBase/FirebaseSetup";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [diet, setDiet] = useState([]);

    const formatFirestoreData = (doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: data.date?.toDate?.() ? data.date.toDate().toDateString() : data.date,
            createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate() : data.createdAt
        };
    };

    useEffect(() => {
        const q = query(
            collection(database, 'activities'),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const activitiesList = snapshot.docs.map(formatFirestoreData);
                setActivities(activitiesList);
            } catch (error) {
                console.error("Error processing activities data:", error);
            }
        }, (error) => {
            console.error("Error fetching activities:", error);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(
            collection(database, 'diet'),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const dietList = snapshot.docs.map(formatFirestoreData);
                setDiet(dietList);
            } catch (error) {
                console.error("Error processing diet data:", error);
            }
        }, (error) => {
            console.error("Error fetching diet entries:", error);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        activities,
        diet,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};