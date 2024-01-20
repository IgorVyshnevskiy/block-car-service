import { useContext } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';

function ClientItem({ client }) {
  const { deleteClient, editClient } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/clients/${client.id}`);
  };

  return (
    <li key={client.id}>
      <div onClick={handleNavigate}>
        <strong>{client.owner}</strong>
        <p>Phone: {client.phone}</p>
        <p>Car: {client.car}</p>
        <p>Mileage: {client.mileage} km</p>
      </div>
      <button onClick={() => deleteClient(client.id)} className='close'>
        <FaTimes color='red' />
      </button>
      <button onClick={() => editClient(client)} className='edit'>
        <FaEdit color='black' />
      </button>
    </li>
  );
}

export default ClientItem