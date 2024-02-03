import React, { useContext } from 'react';
import css from './../DetailItem/DetailListItem.module.css';
import { FaExclamationCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../Button/Button';
import UserContext from '../../../context/userContext';
import { useParams } from 'react-router-dom';

function ReportItem({ reportItem, fetchClientDetails }) {
  const { deleteReport } = useContext(UserContext);
  const { clientId, sessionId } = useParams();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteReport(clientId, sessionId, reportItem.id, fetchClientDetails);
  };

  return (
    <li key={reportItem.id} className={css.detailListItem}>
      <FaExclamationCircle />
      <div>
        <p>Report: {reportItem.report}</p>
        <p>Label: {reportItem.labelWork}</p>
      </div>
      <div>
        <Button
          label={
            <>
              Edit
              <FaEdit color="black" />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={handleDeleteClick}
          label={
            <>
              Delete <FaTrash color="black" style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
    </li>
  );
}

export default ReportItem;
