import { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Button from '../../Button/Button';
import css from './ClientItem.module.css';

function ClientItem({ client }) {
  const { deleteClient, editClient } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/clients/${client.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <li key={client.id} className={css.clientListItem} onClick={handleNavigate}>
      <div>
        <h3 className={css.clientName}>{client.owner}</h3>
        <div className={css.clientWrapper}>
          <p><span className={css.textColor}>Phone:</span>{client.phone}</p>
          <p><span className={css.textColor}>Car:</span>{client.car}</p>
          <p><span className={css.textColor}>Mileage:</span>{client.mileage} km</p>
        </div>
      </div>
      <div className={css.ClientBtnWrapper}>
        <Button
          onClick={(e) => { handleButtonClick(e); editClient(client); }}
          label={
            <>
              Edit
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={(e) => { handleButtonClick(e); deleteClient(client.id); }}
          label={
            <>
              Delete <FaTrash color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
    </li>
  );
}

export default ClientItem;