import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';

function SessionItem({ details }) {
  const { clientId } = useParams();
  const { setSessionEdit } = useContext(UserContext);
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
        <p>mileage: {details.sessionMileage}</p>
        <p>Total Price: {details.totalPrice}</p>
      </div>
        <button
          onClick={() =>
            setSessionEdit({
              clientId,
              session: details,
              edit: true,
            })
          }
          className='edit'
        >
          <FaEdit color='black' />
        </button>
    </li>
  );
}

export default SessionItem;
