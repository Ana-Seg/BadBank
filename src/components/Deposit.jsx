import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap'; 

const Deposit = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container mt-4 d-flex justify-content-center ">
      <Card className="text-center w-50" bg="primary" text="white">
        <h2 className="mt-4" >Deposit</h2>
        <Card.Body>
          {status && <div className="alert alert-info">{status}</div>}
          {show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMsg setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="button"
        className="btn btn-light mt-4"
        onClick={() => {
          props.setShow(true);
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle() {
    props.setStatus('');

    if (!email) {
      props.setStatus('Email is required!');
      console.error('Deposit failed: Email is required');
      return;
    }

    if (!amount) {
      props.setStatus('Amount is required!');
      console.error('Deposit failed: Amount is required');
      return;
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      props.setStatus('Please enter a valid amount greater than zero!');
      console.error('Deposit failed: Invalid amount');
      return;
    }

    const user = ctx.users.find((user) => user.email === email);
    if (!user) {
      props.setStatus('User not found!');
      console.log('User not found for email:', email);
      return;
    }

    user.balance += parsedAmount;
    props.setStatus('Deposit successful! ' + user.name + ' your new balance is: ' + '$' + user.balance);
    console.log('Deposit successful for user:', user.email, 'New balance:', user.balance);
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

      <div className="mb-4">
        <label>Amount</label>
        <input
          type="number"
          className="form-control mb-1"
          placeholder="Enter amount"
          value={amount}
          onChange={e => {
            setAmount(e.currentTarget.value);
          }}
        />
      </div>

      <button
        type="button"
        className="btn btn-light btn-lg mb-4"
        onClick={handle}
      >
        Deposit
      </button>
    </>

  );
}

export default Deposit;
