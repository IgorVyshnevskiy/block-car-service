import React, { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiFileExcel2Line } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Button from '../../Button/Button';
import css from './SessionItem.module.css';
import DateContainer from '../../DateContainer/DateContainer';
import { animateScroll as scroll } from 'react-scroll';
import * as XLSX from 'xlsx';

function SessionItem({ details, fetchClientDetails }) {
  const { clientId } = useParams();
  const { setSessionEdit, deleteSession } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/clients/${clientId}/session/${details.id}`);
  };
  const scrollDuration = 500;
  
  const handleEditClick = (e) => {
    e.stopPropagation();

    scroll.scrollToTop({
      duration: scrollDuration
    });

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

  const exportToExcel = (e) => {
    e.stopPropagation();
    const ws = XLSX.utils.json_to_sheet([details]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SessionDetails');
    XLSX.writeFile(wb, `SessionDetails_${details.id}.xlsx`);
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
          <p className={css.purpose}>
            <span className={css.textColor}>Purpose:</span> {details.purpose}
          </p>
          <div className={css.infoBlockFlex}>
            <p>
              <span className={css.textColor}>Mileage:</span>{' '}
              {details.sessionMileage}
            </p>
            <p>
              <span className={css.textColor}>Total Price:</span>{' '}
              {details.totalPrice}
            </p>
          </div>
        </div>
      </div>
      <div className={css.ClientBtnWrapper}>

        <Button
          onClick={exportToExcel}
          label={
            <>
              Excel
              <RiFileExcel2Line color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'excelBtn'}
        />
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
