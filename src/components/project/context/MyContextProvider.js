// MyContextProvider.js
import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [listDataContent, setListDataContent] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    return (
        <MyContext.Provider value={{ listDataContent, setListDataContent, listCategory, setListCategory}}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
