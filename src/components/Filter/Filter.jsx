import { useContext } from 'react';
import UserContext from '../../context/userContext';
import { IoMdSearch } from 'react-icons/io';
import css from './Filter.module.css'; // Replace with your actual stylesheet

const Filter = () => {
  const { changeFilter } = useContext(UserContext);

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>Find contacts by name</label>
      <div className={css.inputContainer}>
        <IoMdSearch className={css.searchIcon} />
        <input className={css.filterInput}
          type='text'
          onChange={changeFilter}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Filter;