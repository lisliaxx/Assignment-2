import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    let [activities, setActivities] = useState([]);
    let [diet, setDiet] = useState([]);
  
    return (
      <DataContext.Provider value={{ activities, setActivities, diet, setDiet }}>
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