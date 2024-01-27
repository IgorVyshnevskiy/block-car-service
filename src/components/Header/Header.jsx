import { Link } from 'react-router-dom';
import logo from '../../assets/logoCar.png';
import css from './Header.module.css'

function Header({ title }) {
  return (
    <header className={css.headerContainer}>
      <Link to={`/`} style={{ display: 'flex'} }>
        <img
          className={css.logo}
          src={logo}
          alt={title}
        />
        <h1 className={css.title}> {title}</h1>
      </Link>
    </header>
  );
}

export default Header;
