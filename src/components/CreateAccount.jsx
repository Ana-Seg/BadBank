import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap'; 

const CreateAccount = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <div className="container mt-4 d-flex justify-content-center ">
    <Card className="text-center w-50" bg="primary" text="white">
      <h2 className="mt-4" >Create Account</h2>

        <Card.Body>
          {status && <div className="alert alert-info" >{status}</div>}
          {show ? (
            <CreateForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <CreateMsg setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function handle() {
    if (!name) {
      console.error("Validation error: All fields are required.");
      props.setStatus("Name is required.");
      return;
    }

    if (!email) {
      console.error("Validation error: All fields are required.");
      props.setStatus("Email is required.");
      return;
    }

    if (!password) {
      console.error("Validation error: All fields are required.");
      props.setStatus("Password is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      console.error("Validation error: Invalid email format.");
      props.setStatus("Enter a valid email address.");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      props.setStatus(passwordValidation);
      return;
    }

    console.log("Account creation data:", { name, email, password });

    props.setStatus("");
    ctx.users.push({ name, email, password, balance: 100 });
    console.log("Account created successfully:", { name, email });
    props.setShow(false);
  }

  function validatePassword(password) {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return true; // Password is valid
  }

  return (
    <>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control mb-1"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div className="mb-4 ">
        <label>Email address</label>
        <input
          type="email"
          className="form-control mb-1"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-1"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>

      <button type="button" className="btn btn-light btn-lg mb-4" onClick={handle}>
        Create Account
      </button>
      {props.status && <p className="text-danger">{props.status}</p>}
    </>
  );
}

export default CreateAccount;

