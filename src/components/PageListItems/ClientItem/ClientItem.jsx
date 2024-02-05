import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Button from '../../Button/Button';
import DeleteModal from '../../DeleteModal'; // Import the DeleteModal component
import css from './ClientItem.module.css';

function ClientItem({ client }) {
  const { deleteClient, editClient } = useContext(UserContext);
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigate = () => {
    navigate(`/clients/${client.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    editClient(client);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    deleteClient(client.id);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
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
          onClick={(e) => { e.stopPropagation(); handleEditClick(e); }}
          label={
            <>
              Редагувати
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={(e) => { e.stopPropagation(); handleDeleteClick(e); }}
          label={
            <>
              Видалити <FaTrash color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
      {isModalVisible && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          deleteName={client.owner} // Pass the client owner name to the modal
          isOpen={isModalVisible}
        />
      )}
    </li>
  );
}

export default ClientItem;
