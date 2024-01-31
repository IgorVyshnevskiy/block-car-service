import { FaArrowLeft } from "react-icons/fa";
import css from './GoBackBtn.module.css';

function GoBackBtn({onclickHandler}) {
  return (
    <button className={css.backButton} onClick={onclickHandler}>
      <FaArrowLeft className={css.arrowBtn}/>
    </button>
  )
}

export default GoBackBtn
