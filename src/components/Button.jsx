const Button = ({ children, onClick, className = '', type }) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`btn btn-primary shadow-none ${className}`}>
        {children}
      </button>
    </>
  );
};

export default Button;
