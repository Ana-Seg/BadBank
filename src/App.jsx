import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Balance  from './components/Balance';
import AllData from './components/AllData';




const App = () => {
  return (

       <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw/>} />
          <Route path="balance" element={<Balance />} />
          <Route path="allData" element={<AllData />} />
        </Routes>

        </>
  );
};

export default App;





