import React, { useContext, useEffect, useState, useRef } from 'react';
import UserContext from '../../../context/userContext';
import { useParams } from 'react-router-dom';
import css from './../HomeAddForm/FormStyles.module.css';
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
    switch (name) {
      case 'purposeField':
        setPurpose(value);
        break;
      case 'sessionMileageField':
        setSessionMileage(Number(value));
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setDate('');
    setPurpose('');
    setSessionMileage('');
  };

  const submitSession = async (e) => {
    e.preventDefault();

    const newSession = {
      date,
      purpose,
      sessionMileage,
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
      <h2 className={css.formTitle}>Add Session</h2>
      <div className={css.formGroup}>
        <input
          style={{ marginBottom: '4rem' }}
          className={css.inputField}
          type='text'
          name='dateField'
          placeholder='Date'
          ref={datePickerRef}
        />
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='purposeField'
          value={purpose}
          placeholder='purpose'
          autoComplete="off"
          onChange={onHandleChange}
        />
        <label className={css.labelField}>Purpose</label>
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='sessionMileageField'
          value={sessionMileage}
          placeholder='cars mileage'
          autoComplete="off"
          onChange={onHandleChange}
        />
        <label className={css.labelField}>User Mileage</label>
      </div>
      <Button type='Submit' label={'Submit'} styleName={'submitBtn'} />
    </form>
  );
}

export default SessionAddForm;
