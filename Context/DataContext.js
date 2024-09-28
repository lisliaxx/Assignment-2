import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    let [activities, setActivities] = React.useState([
        { id: '1', type: 'Yoga', date: 'Mon Sep 16 2024', duration: '60', distance: 60 },
        { id: '2', type: 'Weights', date: 'Mon Jul 15 2024', duration: 120 }
    ]);
    let [dietEntries, setDietEntries] = useState([
        console.log('dietEntries')
    ]);
  
    let value = {
      activities,
      setActivities,
      dietEntries,
      setDietEntries
    };
  
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
  };
  
  export const useData = () => useContext(DataContext);