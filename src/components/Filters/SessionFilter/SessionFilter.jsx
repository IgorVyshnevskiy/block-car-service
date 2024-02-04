import { useContext } from 'react';
import UserContext from '../../../context/userContext';
import { IoMdSearch } from 'react-icons/io';
import css from './../Filter/Filter.module.css';

const SessionFilter = () => {
  const { changeSessionFilter } = useContext(UserContext);

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>Знайти сеанс</label>
      <div className={css.inputContainer}>
        <IoMdSearch className={css.searchIcon} />
        <input className={css.filterInput}
          type='text'
          onChange={changeSessionFilter}
          placeholder="пошук..."
        />
      </div>
    </div>
  );
};

export default SessionFilter;
