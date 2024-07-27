import React, { useState } from 'react';
import './requests.css';

const Requests = () => {
  const [requests, setRequests] = useState({
    pending: [
      { id: 1, name: 'Request 1', details: 'Details of request 1' },
      { id: 2, name: 'Request 2', details: 'Details of request 2' }
    ],
    accepted: [
      { id: 3, name: 'Request 3', details: 'Details of request 3' }
    ],
    blocked: [
      { id: 4, name: 'Request 4', details: 'Details of request 4' }
    ]
  });

  return (
    <div className="requests">
      <h2>Requests</h2>

      <div className="request-section">
        <h3>Pending Requests</h3>
        <ul>
          {requests.pending.map(request => (
            <li key={request.id}>
              <strong>{request.name}</strong>: {request.details}
            </li>
          ))}
        </ul>
      </div>

      <div className="request-section">
        <h3>Accepted Requests</h3>
        <ul>
          {requests.accepted.map(request => (
            <li key={request.id}>
              <strong>{request.name}</strong>: {request.details}
            </li>
          ))}
        </ul>
      </div>

      <div className="request-section">
        <h3>Blocked Requests</h3>
        <ul>
          {requests.blocked.map(request => (
            <li key={request.id}>
              <strong>{request.name}</strong>: {request.details}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
