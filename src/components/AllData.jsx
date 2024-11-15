import React from 'react';
import { UserContext } from "../components/UserContext";
import { Card } from 'react-bootstrap'; 

const AllData = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);

  return (
    <div className="container mt-4">
      <Card className="text-center" bg="primary" text="white">
        <h2 className="mt-4">All Data</h2>
        <Card.Body>
          {status && <div className="alert alert-info">{status}</div>}
          {show ? (
            <Data setShow={setShow} setStatus={setStatus} />
          ) : (
            <ShowUsers setShow={setShow} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

function Data({ setShow, setStatus }) {
  const ctx = React.useContext(UserContext);

  if (!ctx.users || ctx.users.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {ctx.users.map((user) => (
          <tr key={user.id || user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>********</td>
            <td>{user.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllData;
