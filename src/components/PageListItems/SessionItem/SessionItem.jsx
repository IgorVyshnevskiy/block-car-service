import React, { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Button from '../../Button/Button';
import css from './SessionItem.module.css';
import DateContainer from '../../DateContainer/DateContainer';

function SessionItem({ details, fetchClientDetails }) {
  const { clientId } = useParams();
  const { setSessionEdit, deleteSession } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/clients/${clientId}/details/${details.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setSessionEdit({
      clientId,
      session: details,
      edit: true,
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteSession(clientId, details.id, fetchClientDetails);
  };

  return (
    <li
      key={details.id}
      onClick={handleNavigate}
      className={css.clientListItem}
    >
      <div className={css.sessionWrapper}>
        <DateContainer date={details.date} />
        <div className={css.infoBlock}>
        <p>Purpose: {details.purpose}</p>
        <p>Mileage: {details.sessionMileage}</p>
        <p>Total Price: {details.totalPrice}</p>
        </div>
      </div>
      <div className={css.ClientBtnWrapper}>
        <Button
          onClick={handleEditClick}
          label={
            <>
              Edit
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={handleDeleteClick}
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

export default SessionItem;
