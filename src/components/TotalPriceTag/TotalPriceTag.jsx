import React from 'react';
import css from './TotalTag.module.css';
import { GrMoney } from 'react-icons/gr';

function TotalPriceTag({ details, styleName, spanText, priceType }) {
  console.log(details);

  function calcTotalSum(sumType) {
    const sumSession = details.details.reduce(
      (total, detail) => total + detail[sumType],
      0
    );
    return sumSession.toFixed(); 
  }

  let formattedSum = 0
  if (priceType === 'combinePrice') {
    formattedSum = calcTotalSum('combinePrice');
  } else if (priceType === 'mechPrice') {
    formattedSum = calcTotalSum('mechPrice');
  } else if (priceType === 'detailPrice') {
    formattedSum = calcTotalSum('detailPrice');
  }


const mechTagClass = priceType === 'mechPrice' ? css.MechTag : ''; 

  return (
      <div className={`${css[styleName]} ${mechTagClass}`}>
        <GrMoney className={css.moneyLogo} />
        <span>{spanText}:</span> {formattedSum} грн.
      </div>
  );
}

export default TotalPriceTag;
