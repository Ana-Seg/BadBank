import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap'; 

const Withdraw = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container mt-4 d-flex justify-content-center ">
      <Card className="text-center w-50" bg="primary" text="white">
        <h2 className="mt-4" >Withdraw</h2>
        <Card.Body>
          {status && <div className="alert alert-info">{status}</div>}
          {show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <WithdrawMsg setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="button" className="btn btn-light btn-lg mb-4" onClick={() => {
        props.setShow(true);
      }}>
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);

  const handleWithdraw = () => {
    props.setStatus('');

    if (!email) {
      props.setStatus('Email is required!');
      console.error('Withdraw failed: Email is required');
      return;
    }
    if (!amount) {
      props.setStatus('Amount is required!');
      console.error('Withdraw failed: Amount is required');
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      props.setStatus('Please enter a valid amount greater than 0!');
      console.error('Withdraw failed: Invalid amount:', amount);
      return;
    }

    const user = ctx.users.find(user => user.email === email);
    if (!user) {
      props.setStatus('User not found!');
      console.log('Withdraw failed: User not found for email:', email);
      return;
    }
    if (user.balance <= Number(amount)) {
      props.setStatus('Insufficient Funds!');
      console.error('Withdraw failed: Insufficient funds for user:', email, 'Requested amount:', amount);
      return;
    }

    user.balance -= Number(amount);
    props.setStatus('Withdraw successful! ' + user.name + ' Your new balance is: ' + '$' + user.balance);
    console.log('Withdraw successful for user:', user.email, 'New balance:', user.balance);
    props.setShow(false);
  };

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
        <label>Amount</label>
        <input
          type="number"
          className="form-control mb-1"
          placeholder="Enter amount"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
      </div>

      <button type="button" className="btn btn-light btn-lg mb-4" onClick={handleWithdraw}>
        Withdraw
      </button>
    </>
  );
}

export default Withdraw;
