import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    let [activities, setActivities] = useState([
        { id: '1', type: 'Yoga', date: 'Mon Sep 16 2024', duration: '60', distance: 60 },
        { id: '2', type: 'Weights', date: 'Mon Jul 15 2024', duration: 120 }
    ]);
    let [diet, setDiet] = useState([
        { id: '1', description: 'Breakfast', date: 'Tue Sep 17 2024', calories: 500 },
        { id: '2', description: 'Lunch', date: 'Wed Sep 25 2024', calories: 900 }
      ]);
  
    let value = {
      activities,
      setActivities,
      diet,
      setDiet,
    };
  
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
  };
  
  export const useData = () => useContext(DataContext);