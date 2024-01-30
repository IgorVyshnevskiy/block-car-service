import { useContext } from 'react';
import UserContext from '../../../context/userContext';
import { IoMdSearch } from 'react-icons/io';
import css from './../Filter/Filter.module.css';

const SessionFilter = () => {
  const { changeSessionFilter } = useContext(UserContext);

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>Find contacts by purpose</label>
      <div className={css.inputContainer}>
        <IoMdSearch className={css.searchIcon} />
        <input className={css.filterInput}
          type='text'
          onChange={changeSessionFilter}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SessionFilter;
