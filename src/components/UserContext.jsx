import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      name: "Percy",
      email: "percy@mit.edu",
      password: "12345678",
      balance: 100,

    }
  ]);


  const addUser = (newUser) => {

    if (users.some(user => user.email === newUser.email)) {
      console.warn("User with this email already exists.");
      return;
    }
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUser }}>
      {children}
    </UserContext.Provider>
  );
};


UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};



