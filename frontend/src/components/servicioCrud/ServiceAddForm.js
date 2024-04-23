//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
//CUSTOM HOOKS
//COMPONENTS
//STYLESHEET
//ENV VARIABLES
//**************************************************************

const ServiceAddForm = ({ displaySelf, setDisplay }) => {
  const [display, setDisplays] = useState(null);
  useEffect(() => {
    setDisplays(displaySelf);
  }, [displaySelf]);

  const [showFormats, setShowFormats] = useState(false);

  return (
    <>
      {display && (
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
                Tanto el nombre como el apellido solo aceptan letras del
                alfabeto español
              </p>
              <p>
                La contraseña asiganada debe tener mayúsculas, minúsculas,
                números y carácteres especiales{" "}
              </p>
              <p>
                El formato del número de teléfono deben 10 dígitos separados en
                dos grupos de 3 números y uno de 4 números, separados por un
                espacio. Como se muestra: <strong>320 330 4550</strong>
              </p>
              <p>
                El formato de la cédula deben ser 10 dígitos sin espacio entre
                ellos
              </p>
            </div>
          )}

          <form className="form-div">
            <div className="form-fields">
              <div>
                <label>Cliente</label>
                <input
                  type="text"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
                />
              </div>
              <div>
                <label>Placa del auto</label>
                <input type="text" pattern="[A-Z]{3} [0-9]{3}" />
              </div>
              <div>
                <label>Tipo de auto</label>
                <input list="tipoAutos" />
                <datalist id="tipoAutos">
                  <option value="carro" />
                  <option value="camioneta" />
                </datalist>
              </div>
              <div>
                <label>Tipo de servicio</label>
                <input type="text" />
              </div>
              <div>
                <label>Precio</label>
                <span>$precio</span>
              </div>

              <div>
                <label>Detalles del auto</label>
                <input type="text" />
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
