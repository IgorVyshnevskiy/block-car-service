
import React from 'react';
import css from './DateContainer.module.css'

const DateContainer = ({ date }) => {
  const formattedDate = new Date(date);
  const month = formattedDate.toLocaleString('en-US', { month: 'long' });
  const day = formattedDate.toLocaleString('en-US', { day: '2-digit' });
  const year = formattedDate.getFullYear();

  return (
    <div className={css.dateWrapper}>
      <div className={css.dateDay}>{day}</div>
      <div className={css.dateMonth}>{month}</div>
      <div className={css.dateYear}>{year}</div>
    </div>
  );
};

export default DateContainer;
