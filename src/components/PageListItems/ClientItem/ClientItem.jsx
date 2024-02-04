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
          <p><span className={css.textColor}>Номер телефону:</span>{client.phone}</p>
          <p><span className={css.textColor}>Авто:</span>{client.car}</p>
          <p><span className={css.textColor}>Пробіг:</span>{client.mileage} км</p>
        </div>
      </div>
      <div className={css.ClientBtnWrapper}>
        <Button
          onClick={(e) => { handleButtonClick(e); editClient(client); }}
          label={
            <>
              Редагувати
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={(e) => { handleButtonClick(e); deleteClient(client.id); }}
          label={
            <>
              Видалити <FaTrash color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
    </li>
  );
}


export default ClientItem;