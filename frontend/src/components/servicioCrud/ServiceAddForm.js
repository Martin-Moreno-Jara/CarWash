//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
//CUSTOM HOOKS
//COMPONENTS
//STYLESHEET
import "../../stylesheets/ServiceAddForm.css";
//ENV VARIABLES
//**************************************************************

const ServiceAddForm = ({ displaySelf, setDisplay }) => {
  const [showFormats, setShowFormats] = useState(false);

  //opciones de autos
  const autoOptions = [
    { nombre: "Carro", key: 1 },
    { nombre: "Camioneta", key: 2 },
  ];

  //estados para manejar los inputs
  const [cliente, setCliente] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipoAuto, setTipoAuto] = useState("");
  const [servicio, setServicio] = useState("");
  const [precio, setPrecio] = useState("$ -");
  const [detalles, setDetalles] = useState("");

  //funciones para guardar los cambios en los estados
  const handleCliente = (e) => {
    setCliente(e.target.value);
  };
  const handlePlaca = (e) => {
    setPlaca(e.target.value.toUpperCase());
  };
  const handleTipoAuto = (e) => {
    setTipoAuto(e.target.value);
  };
  const handleServicio = (e) => {
    setServicio(e.target.value);
  };
  const handlePrecio = (e) => {};
  const handleDetalles = (e) => {
    setDetalles(e.target.value);
  };

  //funcion para controlar el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cliente, placa, tipoAuto, servicio, detalles);
    setDisplay(false);
  };
  return (
    <>
      {displaySelf && (
        <div className="main-container">
          <div className="closebtn">
            <span
              className="material-symbols-outlined"
              onClick={() => {
                setDisplay(!displaySelf);
              }}
            >
              close
            </span>
          </div>
          <h2>Ingrese el nuevo servicio</h2>
          <div
            className="show-formats"
            onClick={() => {
              setShowFormats(!showFormats);
            }}
          >
            {showFormats ? "ocultar formatos" : "Mostrar formatos aceptados"}{" "}
            <span className="material-symbols-outlined">
              {showFormats ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>
          {showFormats && (
            <div className="formatos">
              <p>
                El nombre del cliente solo acepta carácteres del alfabeto
                español
              </p>
              <p>
                La placa del auto debe estar en el formato colombiano, es decir,
                tres letras seguidas de un espacio y luego tres números. Como se
                aprecia en el ejemplo: <strong>ABC 123</strong>
              </p>
            </div>
          )}

          <form className="form-div" onSubmit={handleSubmit}>
            <div className="form-fields">
              <div>
                <label>Cliente</label>
                <input
                  type="text"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
                  onChange={handleCliente}
                />
              </div>
              <div>
                <label>Placa del auto</label>
                <input
                  type="text"
                  pattern="[a-zA-Z]{3} [0-9]{3}"
                  onChange={handlePlaca}
                />
              </div>
              <div>
                <label>Tipo de auto</label>
                <select className="form-select" onChange={handleTipoAuto}>
                  {autoOptions.map((option) => (
                    <option key={option.key}>{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Tipo de servicio</label>
                <input type="text" onChange={handleServicio} />
              </div>
              <div>
                <label>Precio</label>
                <span>{precio}</span>
              </div>

              <div>
                <label>Detalles del auto</label>
                <input type="text" onChange={handleDetalles} />
              </div>
            </div>
            <button className="submit-btn">Generar Servicio</button>
          </form>
          {/* {isLoading && (
        <div className="loading2">
          <MoonLoader color="#1c143d" loading={isLoading} size={100} />
        </div>
      )} */}

          {/* {error && <div className="error">{error}</div>} */}
        </div>
      )}
    </>
  );
};
export default ServiceAddForm;
