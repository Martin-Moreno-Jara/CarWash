import carwashlogo from "../images/carwash-logo.jpg";

const NavBar = () => {
  return (
    <header>
      <div className="mainHeader-container">
        <img src={carwashlogo} alt="Logo de la aplicacion" />

        <h2>Carwash</h2>
      </div>
    </header>
  );
};

export default NavBar;
