// MyContextProvider.js
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { fetchGetUserByJWT } from '../../../services/AuthService';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const tokenJWT = localStorage.getItem('token');
  const [listDataContent, setListDataContent] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isUnauthorized, setIsUnauthorized] = useState();

  const setUnauthorized = () => {
    setIsUnauthorized(true);
  };

  const resetUnauthorized = () => {
    setIsUnauthorized(false);
  };

  useEffect(() => {
    handleGetUserByJwtToken();
  }, []);

  //get user by jwt token
  const handleGetUserByJwtToken = async () => {
    let res = await fetchGetUserByJWT();
    // console.log(res);
    if (res.status) {
      resetUnauthorized();
      setCurrentUser(res.data);
    }
    else {
      setUnauthorized();
    }
  };


  return (
    <MyContext.Provider value={{ listDataContent, setListDataContent, listCategory, setListCategory, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized, currentUser, setCurrentUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMycontext = () => {
  return useContext(MyContext);
};
