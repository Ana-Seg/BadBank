import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap';

const Balance = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container mt-4 d-flex justify-content-center ">
      <Card className="text-center w-50" bg="primary" text="white">
        <h2 className="mt-4" >Balance</h2>
        <Card.Body>
          {status && <div className="alert alert-info">{status}</div>}
          {show ? (
            <BalanceForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <BalanceMsg setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="button"
        className="btn btn-light mb-4"
        onClick={() => {
          props.setShow(true);
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const ctx = React.useContext(UserContext);

  const handle = () => {
    props.setStatus('');

    if (!email) {
      props.setStatus('Email is required!');
      console.error('Balance check failed: Email is required');
      return;
    }

    const user = ctx.users.find(user => user.email === email);
    if (!user) {
      props.setStatus('User not found!');
      console.error('Balance check failed: User not found for email:', email);
      return;
    }

    props.setStatus(user.name + ' your balance is: ' + '$' + user.balance);
    console.log('Current balance for user:', user.email, 'Balance:', user.balance);
    props.setShow(false);
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
            setEmail(e.currentTarget.value);
          }}
        />
      </div>

      <button
        type="button"
        className="btn btn-light btn-lg mb-4"
        onClick={handle}
      >
        Check Balance
      </button>
    </>
  );
}

export default Balance;
