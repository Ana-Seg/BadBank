import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap'; 



const Login = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container mt-4 d-flex justify-content-center ">
      <Card className="text-center w-50" bg="primary" text="white">
        <h2 className="mt-4">Login</h2>
        <Card.Body>
          {status && <div className="alert alert-info">{status}</div>}
          {show ? (
            <LoginForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <LoginMsg setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
        }}
      >
        Login again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const ctx = React.useContext(UserContext);

  const handleLogin = () => {
    setLoading(true);
    props.setStatus('');
    console.log('Login button clicked');

    if (!email) {
      props.setStatus('Email is required!');
      console.log('Login failed: Email is required');
      setLoading(false);
      return;
    }
    if (!password) {
      props.setStatus('Password is required!');
      console.log('Login failed: Password is required');
      setLoading(false);
      return;
    }

    const user = ctx.users.find(user => user.email === email);

    if (!user) {
      props.setStatus('User not found!');
      console.log('Login failed: User not found for email:', email);
      setLoading(false);
      return;
    }
    if (user.password !== password) {
      props.setStatus('Invalid credentials!');
      console.log('Login failed: Invalid credentials for user:', email);
      setLoading(false);
      return;
    }

    props.setStatus('');
    props.setShow(false);
    console.log('Login successful for user:', email);
    setLoading(false);
  }

  return (
    <>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          className="form-control mb-1"
          placeholder="Enter email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-1"
          placeholder="Enter password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        type="button"
        className="btn btn-light btn-lg mb-4"
        onClick={handleLogin}
        disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </>
  );
}

export default Login;


