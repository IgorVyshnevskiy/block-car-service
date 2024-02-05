import css from './TotalTag.module.css';
import { GrMoney } from 'react-icons/gr';

function TotalPriceTag({ details, styleName }) {
  const sumSession = details.details.reduce(
    (total, detail) => total + detail.combinePrice,
    0
  );
  const formattedSum = sumSession.toFixed();

  return (
    <div className={css.container}>
      <div className={css[styleName]}>
        <GrMoney className={css.moneyLogo} />
        <span>Загальна сума:</span> {formattedSum} грн.
      </div>
    </div>
  );
}

export default TotalPriceTag;
