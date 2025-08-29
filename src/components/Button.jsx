const Button = ({ children, onClick, className = '' }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn btn-primary shadow-none ${className}`}>
        {children}
      </button>
    </>
  );
};

export default Button;
