import css from './Button.module.css'

const Button = ({ onClick, label , styleName}) => {
  return (
    <button onClick={onClick} className={css[styleName]}>
      {label}
    </button>
  );
};

export default Button;