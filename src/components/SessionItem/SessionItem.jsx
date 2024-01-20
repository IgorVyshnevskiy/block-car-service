import React from 'react';
import { useNavigate } from 'react-router-dom';

function SessionItem({ details, clientId }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/clients/${clientId}/details/${details.id}`);
  };

  return (
    <li key={details.id}>
      <div onClick={handleNavigate}>
        <p>Session ID: {details.id}</p>
        <p>Date: {details.date}</p>
        <p>Purpose: {details.purpose}</p>
        <p>Total Price: {details.fullPrice}</p>
      </div>
    </li>
  );
}

export default SessionItem;
