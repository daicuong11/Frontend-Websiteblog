// MyContextProvider.js
import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [listDataContent, setListDataContent] = useState([]);
    return (
        <MyContext.Provider value={{ listDataContent, setListDataContent }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };