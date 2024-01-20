import { Link } from 'react-router-dom';
import logo from '../../assets/logoCar.png';

function Header({ title }) {
  return (
    <header>
      <Link to={`/`} style={{ display: 'flex'} }>
        <img
          style={{ width: '40px', height: '40px', marginRight: '20px' }}
          src={logo}
          alt={title}
        />
        <h2>{title}</h2>
      </Link>
    </header>
  );
}

export default Header;
