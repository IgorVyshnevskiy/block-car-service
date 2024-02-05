import { useContext } from 'react';
import UserContext from '../../../context/userContext';
import { IoMdSearch } from 'react-icons/io';
import css from './../Filter.module.css';

const Filter = () => {
  const { changeFilter } = useContext(UserContext);

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>Знайти клієнта по імені</label>
      <div className={css.inputContainer}>
        <IoMdSearch className={css.searchIcon} />
        <input className={css.filterInput}
          type='text'
          onChange={changeFilter}
          placeholder="пошук..."
        />
      </div>
    </div>
  );
};

export default Filter;
