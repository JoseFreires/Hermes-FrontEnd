

export const Button = ({value, onClick, disabled, type, classe}) => {
  return (
    <button className={[classe]+ " " + [type]} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
}