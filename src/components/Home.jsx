
import React from 'react';
import { UserContext } from "../components/UserContext";
import bank from '../assets/bank.png';
import { Card } from 'react-bootstrap'; 

const Home = () => {
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Card className="text-center W-50" bg="primary" text="white">
        <h1 className="mt-4">BadBank Landing Page</h1>
        <Card.Body>
          <h2>Welcome to BadBank</h2>
          <h5>
            Select from the menu to start banking
          </h5>
          <img src={bank} className="img-fluid mb-3" alt="A modern bank building" />
          <h5>Experience banking like never before!</h5>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
