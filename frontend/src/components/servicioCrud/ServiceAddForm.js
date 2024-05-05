//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import MoonLoader from "react-spinners/MoonLoader";
//CUSTOM HOOKS
import { useServiceContext } from "../../hooks/servicioHooks/useServiceContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//COMPONENTS
//STYLESHEET
import "../../stylesheets/ServiceAddForm.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

const ServiceAddForm = ({ displaySelf, setDisplay }) => {
  //variable global del usuario y su dispatch (viene desde el contexto de autenticacion)
  const { usuario } = useAuthContext();
  const { dispatch } = useServiceContext();

  //snackbar de notistack para mostrar mensaje de confirmacion
  const { enqueueSnackbar } = useSnackbar();

  //Estados para mostrar condicionalmente contenido
  const [showFormats, setShowFormats] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);

  //opciones de autos para dropdown
  const autoOptions = [
    { nombre: "Carro", key: 1 },
    { nombre: "Camioneta", key: 2 },
  ];

  const [tarifas, setTarifas] = useState([]);

  //opciones de servicios para dropdown
  const serviciosOptions = tarifas.map((tarifa) => ({
    nombre: tarifa.servicio,
    carro: tarifa.precio[0].carro,
    camioneta: tarifa.precio[0].camioneta,
    key: tarifa._id,
  }));

  //traer tipos de servicios para dropdown
  useEffect(() => {
    const fetchTarifas = async () => {
      const response = await fetch(`${apiURL}/api/tarifas`);
      const json = await response.json();
      if (!response.ok) {
        throw Error(`no se pudo porque: ${json}`);
      }
      if (response.ok) {
        setTarifas(json);
      }
    };
    fetchTarifas();
  }, []);

  //estados para manejar los inputs
  const [cliente, setCliente] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipoAuto, setTipoAuto] = useState("");
  const [servicio, setServicio] = useState("");
  const [precio, setPrecio] = useState("");
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
  const handleDetalles = (e) => {
    setDetalles(e.target.value);
  };

  //cambiar el precio
  useEffect(() => {
    serviciosOptions.forEach((serviceOption) => {
      if (serviceOption.nombre === servicio) {
        if (tipoAuto === "Carro") {
          setPrecio(serviceOption.carro);
        }
        if (tipoAuto === "Camioneta") {
          setPrecio(serviceOption.camioneta);
        }
      }
    });
  }, [tipoAuto, servicio, serviciosOptions]);

  //funcion para controlar el envio del formulario
  const handleSubmit = async (e) => {
    setIsloading(true);
    setError(null);
    e.preventDefault();
    console.log(usuario);
    const encargado = {
      encargadoId: usuario.id,
      encargadoNombre: usuario.nombre,
      encargadoUsuario: usuario.usuario,
    };
    console.log(encargado);
    const response = await fetch(`${apiURL}/api/servicioCRUD`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify({
        cliente,
        placa,
        tipoAuto,
        tipoServicio: servicio,
        precio,
        encargado,
        carInfo: detalles,
      }),
    });
    //TODO:Poner estados de errores e Isloading
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsloading(false);
      enqueueSnackbar("Error al crear servicio", { variant: "error" });
    }
    if (response.ok) {
      setError(null);
      dispatch({ type: "ADD_SERVICE", payload: json });
      setIsloading(false);
      enqueueSnackbar("Servicio creado correctamente", { variant: "success" });
      setDisplay(false);
    }
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
                  <option></option>
                  {autoOptions.map((option) => (
                    <option key={option.key}>{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Tipo de servicio</label>
                <select className="form-select" onChange={handleServicio}>
                  <option></option>
                  {serviciosOptions.map((option) => (
                    <option key={option.key} content="hola">
                      {option.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Precio</label>
                <span>
                  {precio
                    ? `$ ${new Intl.NumberFormat().format(precio)}`
                    : "$ -"}
                </span>
              </div>

              <div>
                <label>Detalles del auto</label>
                <input type="text" onChange={handleDetalles} />
              </div>
            </div>
            <button className="submit-btn">Generar Servicio</button>
          </form>
          {isLoading && (
            <div className="loading2">
              <MoonLoader color="#1c143d" loading={isLoading} size={100} />
            </div>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      )}
    </>
  );
};
export default ServiceAddForm;
