import React, { useContext, useEffect, useState, useRef } from 'react';
import UserContext from '../../../context/userContext';
import { useParams } from 'react-router-dom';
import css from './../FormStyles.module.css';
import Button from '../../Button/Button';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css'; 


function SessionAddForm({ sessionFn }) {
  const { clientId } = useParams();
  const { sessionEdit, updateSessions, addSession } = useContext(UserContext);
  const [date, setDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [sessionMileage, setSessionMileage] = useState('');

  const datePickerRef = useRef(null);

  useEffect(() => {
    if (sessionEdit.edit) {
      setDate(sessionEdit?.session.date);
      setPurpose(sessionEdit?.session.purpose);
      setSessionMileage(sessionEdit?.session.sessionMileage);
    }


    const flatpickrInstance = flatpickr(datePickerRef.current, {
      dateFormat: 'Y-m-d',
      defaultDate: date,
      onChange: (selectedDates) => {
        setDate(selectedDates[0]);
      },
      theme: 'confetti',
    });
  

    return () => {
      if (flatpickrInstance) {
        flatpickrInstance.destroy();
      }
    };
  }, [sessionEdit, date]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === 'sessionMileageField') {
      if (isNaN(value)) {
        return
      } else {
        parsedValue = Number(value);
      }
    }
    switch (name) {
      case 'dateField':
        setDate(parsedValue);
        break;
      case 'purposeField':
        setPurpose(parsedValue);
        break;
      case 'sessionMileageField':
        setSessionMileage(Number(parsedValue));
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setDate('');
    setPurpose('');
    setSessionMileage('');

    if (datePickerRef.current) {
      datePickerRef.current._flatpickr.clear();
    }
  };

  const submitSession = async (e) => {
    e.preventDefault();

    const newSession = {
      date,
      purpose,
      sessionMileage,
      totalPrice: 0,
      details: sessionEdit.session.details,  
      reports: sessionEdit.session.reports,  
    };

    if (sessionEdit.edit) {
      await updateSessions(clientId, { ...sessionEdit.session, ...newSession }, sessionFn);
    } else {
      await addSession(clientId, newSession);
      sessionFn();
    }

    reset();
  };

  return (
    <form className={css.formContainer} onSubmit={submitSession}>
      <h2 className={css.formTitle}>ДОБАВИТИ СЕАНС</h2>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='dateField'
          placeholder='дата'
          ref
          ={datePickerRef}
          required
        />
        <label className={css.labelField}>дата</label>
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='purposeField'
          value={purpose}
          placeholder='причина звернення'
          autoComplete="off"
          required
          onChange={onHandleChange}
        />
        <label className={css.labelField}>причина звернення</label>
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='sessionMileageField'
          value={sessionMileage}
          maxLength={7}
          placeholder='пробіг'
          autoComplete="off"
          required
          onChange={onHandleChange}
        />
        <label className={css.labelField}>пробіг</label>
      </div>
      <Button type='Submit' label={'Добавити'} styleName={'submitBtn'} />
    </form>
  );
}

export default SessionAddForm;
