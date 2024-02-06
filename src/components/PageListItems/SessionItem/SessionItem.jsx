import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiFileExcel2Line } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Button from '../../Button/Button';
import css from './SessionItem.module.css';
import DateContainer from '../../DateContainer/DateContainer';
import TotalPriceTag from '../../TotalPriceTag';
import DeleteModal from '../../DeleteModal';
import ExcelJS from 'exceljs'; // Importing exceljs

function SessionItem({ details, fetchClientDetails }) {
  const { clientId } = useParams();
  const { setSessionEdit, deleteSession } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigate = () => {
    navigate(`/clients/${clientId}/session/${details.id}`);
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
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    deleteSession(clientId, details.id, fetchClientDetails);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const exportToExcel = async (e) => {
    e.stopPropagation();
    if (!details || !details.details || details.details.length === 0 || !details.reports || details.reports.length === 0) {
      console.error("No session details or reports available.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('SessionDetails');

    // Add headers for details
    worksheet.addRow(['Дата', 'Причина звернення', 'Пробіг авто', 'Загальна сума', 'Запчастина', 'Сума за запчастину']);

    // Calculate total price as sum of combine prices
    let totalPrice = 0;
    details.details.forEach(detail => {
      totalPrice += detail.combinePrice;
    });

    // Format date as DD.MM.YYYY
    const formattedDate = new Date(details.date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const formattedDateString = `${day}.${month}.${year}`;

    // Add session details
    details.details.forEach(detail => {
      worksheet.addRow([
        formattedDateString,
        details.purpose,
        details.sessionMileage,
        totalPrice,
        detail.detail,
        detail.combinePrice
      ]);
    });

    // Add headers for reports
    worksheet.addRow(['Зауваження', 'Рекомендований час для вирішення']);

    // Add reports
    details.reports.forEach(report => {
      worksheet.addRow([
        report.report,
        report.difficulty
      ]);
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SessionDetails_${details.id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};



  return (
    <li key={details.id} onClick={handleNavigate} className={css.clientListItem}>
      <div className={css.sessionWrapper}>
        <DateContainer date={details.date} />
        <div className={css.infoBlock}>
          <p className={css.purpose}>
            <span className={css.textColor}>Причина звернення:</span> {details.purpose}
          </p>
          <div className={css.infoBlockFlex}>
            <p>
              <span className={css.textColor}>Пробіг:</span>{' '}
              {details.sessionMileage}
            </p>
            <TotalPriceTag details={details} styleName={'inlineSession'} spanText={'Загальна сума'} priceType={'combinePrice'}/>
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
              Редагувати
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={handleDeleteClick}
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
          deleteName={'сеанс'}
          isOpen={isModalVisible}
        />
      )}
    </li>
  );
}

export default SessionItem;
