import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import css from './../FormStyles.module.css';
import Button from '../../Button/Button';

function ReportAddForm({ fetchClientsDetails }) {
  const { clientId, sessionId } = useParams();
  const { reportEdit, updateReport, addReport } = useContext(UserContext);
  const [report, setReport] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    if (reportEdit.edit) {
      setReport(reportEdit?.report.report);
      setDifficulty(reportEdit?.report.difficulty);
    }
  }, [reportEdit]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'difficultyField':
        setDifficulty(value);
        break;
      case 'reportField':
        setReport(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setReport('');
    setDifficulty('easy');
  };

  const submitReport = async (e) => {
    e.preventDefault();
  
    const newReport = {
      report,
      difficulty,
    };
  
    if (reportEdit.edit) {
      await updateReport(
        clientId,
        sessionId,
        { ...reportEdit.report, ...newReport },
        fetchClientsDetails
      );
    } else {
      await addReport(Number(clientId), Number(sessionId), newReport);
      fetchClientsDetails();
    }
    reset();
  };

  return (
    <form
      className={`${css.formContainer} ${css.reportContainer}`}
      onSubmit={submitReport}
    >
      <h2 className={css.formTitle}>ДОБАВИТИ ЗАУВАЖЕННЯ</h2>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='reportField'
          value={report}
          placeholder='зауваження'
          autoComplete='off'
          required
          onChange={onHandleChange}
        />
        <label className={css.labelField}>зауваження</label>
      </div>
      <div className={css.formGroup}>
      <h2 className={css.formTitle}>РЕКОМЕНДОВАНИЙ ЧАС ДЛЯ ВИРІШЕННЯ ПРОБЛЕМИ</h2>
        <div className={css.radioGroup}>
          <input
            type='radio'
            id='easy'
            name='difficultyField'
            value='easy'
            checked={difficulty === 'easy'}
            onChange={onHandleChange}
            className={css.radioInput}
          />
          <label htmlFor='easy' className={css.radioLabel}>
            <div className={css.radioBtn}></div>
            По Можливості
          </label>

          <input
            type='radio'
            id='medium'
            name='difficultyField'
            value='medium'
            checked={difficulty === 'medium'}
            onChange={onHandleChange}
            className={css.radioInput}
          />
          <label htmlFor='medium' className={css.radioLabel}>
            <div className={css.radioBtn}></div>
            Ближайший час
          </label>

          <input
            type='radio'
            id='hard'
            name='difficultyField'
            value='hard'
            checked={difficulty === 'hard'}
            onChange={onHandleChange}
            className={css.radioInput}
          />
          <label htmlFor='hard' className={css.radioLabel}>
            <div className={css.radioBtn}></div>
            Негайно
          </label>
        </div>
      </div>
      <Button type='Submit' label={'Добавити'} styleName={'submitBtn'} />
    </form>
  );
}

export default ReportAddForm;
