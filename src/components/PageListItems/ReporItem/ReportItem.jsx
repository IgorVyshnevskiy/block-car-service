import React, { useContext, useState } from 'react';
import { FaExclamationCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../Button/Button';
import DeleteModal from '../../DeleteModal';
import UserContext from '../../../context/userContext';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import css from './ReportItem.module.css';

function ReportItem({ reportItem, fetchClientDetails }) {
  const { editReport, deleteItem } = useContext(UserContext);
  const { clientId, sessionId } = useParams();

  const scrollDuration = 500;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
  
    scroll.scrollToTop({
      duration: scrollDuration,
    });
  
    editReport(Number(clientId), Number(sessionId), reportItem.id, fetchClientDetails);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    deleteItem(clientId, sessionId, reportItem.id, 'report', fetchClientDetails);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const labelType = reportItem.difficulty;

  return (
    <li key={reportItem.id} className={`${css.detailListItem} ${css[labelType]}`}>
      <div className={css.contentContainer}>
        <p><FaExclamationCircle className={css.reportLogo} /> <span className={css.textColor}>Зауваження:</span> {reportItem.report}</p>
      </div>
      <div className={css.btnWrapper}>
        <Button
        onClick={handleEditClick}
          label={
            <>
              Редагувати
              <FaEdit color="black" style={{ marginLeft: '4px' }}/>
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={handleDeleteClick}
          label={
            <>
              Видалити <FaTrash color="black" style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
      {isModalVisible && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          deleteName={'зауваження'}
          isOpen={isModalVisible}
        />
      )}
    </li>
  );
}

export default ReportItem;
