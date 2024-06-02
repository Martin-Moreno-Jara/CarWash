// REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import MoonLoader from "react-spinners/MoonLoader";
// CUSTOM HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
// STYLESHEET
import "../../stylesheets/ServiceInfo.css";  // Asegúrate de que el archivo de estilos esté enlazado correctamente
// ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

const ServiceMoreForm = ({ moreOpen, moreClose, moreService }) => {

  // Variable global del usuario y su dispatch (viene desde el contexto de autenticación)
  const { usuario } = useAuthContext();

  // Snackbar de notistack para mostrar mensaje de confirmación
  const { enqueueSnackbar } = useSnackbar();

  const additionalUser = {
    apellido: "Jimenez",
    nombre: "Raul",
    rol: "administrador",
    usuario: "raulJm",
    _id: "660b75a326e70fee3afe0740"
  };

  // Estados para mostrar condicionalmente contenido
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // Opciones de autos para dropdown
  const autoOptions = [
    { nombre: "Carro", key: 1 },
    { nombre: "Camioneta", key: 2 },
  ];

  const [tarifas, setTarifas] = useState([]);

  // Opciones de servicios para dropdown
  const serviciosOptions = tarifas.map((tarifa) => ({
    nombre: tarifa.servicio,
    carro: tarifa.precio[0].carro,
    camioneta: tarifa.precio[0].camioneta,
    key: tarifa._id,
  }));

  // Traer tipos de servicios para dropdown
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

  const [employeeList, setEmployeeList] = useState([]);

  // Obtener la lista de empleados del backend
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiURL}/api/empleadoCRUD`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        console.log(json);
        throw Error("No se pudieron traer empleados");
      }
      if (response.ok) {
        setIsLoading(false);
        setEmployeeList(json);
      }
    };
    fetchEmployees();
  }, [usuario.token]);

  // Estados para manejar los inputs
  const [cliente, setCliente] = useState(moreService ? moreService.cliente : "");
  const [placa, setPlaca] = useState(moreService ? moreService.placa : "");
  const [tipoAuto, setTipoAuto] = useState(moreService ? moreService.tipoAuto : "");
  const [servicio, setServicio] = useState(moreService ? moreService.tipoServicio : "");
  const [precio, setPrecio] = useState(moreService ? moreService.precio : "");
  const [encargado, setEncargado] = useState(moreService ? moreService.encargado[0].encargadoUsuario : "");
  const [encargadoAct, setEncargadoAct] = useState({
    encargadoId: moreService ? moreService.encargado[0].encargadoId : "",
    encargadoNombre: moreService ? moreService.encargado[0].encargadoNombre : "",
    encargadoUsuario: moreService ? moreService.encargado[0].encargadoUsuario : ""
  });

  const [detalles, setDetalles] = useState(moreService ? moreService.carInfo : "");
  const [historial, setHistorial] = useState(moreService ? moreService.historial : []);
  const employeesWithAdditionalUser = [additionalUser, ...employeeList];

  // Funciones para guardar los cambios en los estados
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

  // Manejar cambio en el select de encargado
  const handleEncargadoChange = (e) => {
    const selectedUsuario = e.target.value.trim();

    const selectedEmployee = employeesWithAdditionalUser.find(
      (employee) => employee.usuario === selectedUsuario
    );

    if (selectedEmployee) {
      setEncargadoAct({
        encargadoId: selectedEmployee._id,
        encargadoNombre: `${selectedEmployee.nombre} ${selectedEmployee.apellido}`,
        encargadoUsuario: selectedUsuario
      });
    }

    setEncargado(selectedUsuario);
  };

  // Cambiar el precio
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

  // Función para controlar el envío del formulario
  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError(null);
    e.preventDefault();

    const encargado = {
      encargadoId: encargadoAct.encargadoId,
      encargadoNombre: encargadoAct.encargadoNombre,
      encargadoUsuario: encargadoAct.encargadoUsuario,
    };

    try {
      const response = await fetch(`${apiURL}/api/servicioCRUD/${moreService._id}`, {
        method: "PATCH", // Cambia el método a PATCH para actualizar el servicio
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
          carInfo: detalles
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      setIsLoading(false);
      enqueueSnackbar("Servicio editado correctamente", { variant: "success" });
      moreClose(); // Cerrar el formulario después de la edición exitosa
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      enqueueSnackbar("Error al editar servicio", { variant: "error" });
    }
  };

  // Estado y función para manejar el despliegue del historial de actualizaciones
  const [showHistory, setShowHistory] = useState(false);

  // Datos simulados para el historial de actualizaciones
  const updateHistory = [
    {
<<<<<<< HEAD
      fecha: "2023-01-01T12:00:00Z",
=======
      date: "2023-01-01T12:00:00Z",
>>>>>>> a13ba1e8004e2776ea888d4b5bdba68e417a66ae
      cliente: "Carlos Perez",
      placa: "ABC1234",
      tipoAuto: "Carro",
      tipoServicio: "Cambio de aceite",
      encargado: "raulJm",
      detalles: "Motor 1.6, 4 puertas",
      precio: 30000,
      usuario: "raulJm"
    },
    {
      date: "2023-02-15T15:30:00Z",
      cliente: "Laura Gonzalez",
      placa: "XYZ5678",
      tipoAuto: "Camioneta",
      tipoServicio: "Lavado completo",
      encargado: "anaM",
      detalles: "Camioneta 4x4, color rojo",
      precio: 45000,
      usuario: "Kiki"
    }
  ];

<<<<<<< HEAD
  console.log("original");
  console.log(moreService.historial);
  console.log("guardado")
  console.log(historial);

=======
>>>>>>> a13ba1e8004e2776ea888d4b5bdba68e417a66ae
  // Formato de fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {moreOpen && (
        <div className="main-container">
          <div className="closebtn">
            <span
              className="material-symbols-outlined"
              onClick={() => {
                moreClose(!moreOpen);
              }}
            >
              close
            </span>
          </div>
          <h2>Información del servicio</h2>         
          <form className="form-div" onSubmit={handleSubmit}>
            <div className="form-fieldsMoreService">
              <div>
                <label>Cliente</label>
                <input
                  type="text"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
                  value={cliente}
                  onChange={handleCliente}
                  readOnly
                />
              </div>
              <div>
                <label>Placa del auto</label>
                <input
                  type="text"
                  pattern="[a-zA-Z]{3} [0-9]{3}"
                  value={placa}
                  onChange={handlePlaca}
                  readOnly
                />
              </div>
              <div>
                <label>Tipo de auto</label>
                <select className="form-select" value={tipoAuto} onChange={handleTipoAuto} disabled>
                  <option></option>
                  {autoOptions.map((option) => (
                    <option key={option.key}>{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Tipo de servicio</label>
                <select className="form-select" value={servicio} onChange={handleServicio} disabled>
                  <option></option>
                  {serviciosOptions.map((option) => (
                    <option key={option.key} content="hola">
                      {option.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Encargado</label>
                {usuario.rol === 'administrador' ? (
                  <select className="form-select" value={encargado} onChange={handleEncargadoChange} required disabled>
                    <option></option>
                    {employeesWithAdditionalUser.map((employee) => (
                      <option key={employee._id} value={employee.usuario}>
                        {employee.usuario} {/* Cambiar a la propiedad deseada */}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={encargado}
                    onChange={(e) => setEncargado(e.target.value)}
                    disabled
                  />
                )}
              </div>
              <div>
                <label>Detalles del auto</label>
                <input type="text" value={detalles} onChange={handleDetalles} readOnly/>
              </div>
              <div>
                <label>Precio</label>
                <span>
                  {precio
                    ? `$ ${new Intl.NumberFormat().format(precio)}`
                    : "$ -"}
                </span>
              </div>
            </div>
            
          </form>
          {isLoading && (
            <div className="loading2">
              <MoonLoader color="#1c143d" loading={isLoading} size={100} />
            </div>
          )}
          <div className="show-history-container">
            <div
              className="show-history"
              onClick={() => {
                setShowHistory(!showHistory);
              }}
            >
              <span className="history-text">
                {showHistory ? "Ocultar historial" : "Mostrar historial de cambios"}
              </span>
              <span className="material-symbols-outlined">
                {showHistory ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </div>
          </div>
          {showHistory && (
            <div className="history-container">
<<<<<<< HEAD
              {historial.map((update, index) => (
                <div key={index} className="history-item">
                  <p><strong>Fecha de actualización:</strong> {formatDate(update.fecha)}</p>
=======
              {updateHistory.map((update, index) => (
                <div key={index} className="history-item">
                  <p><strong>Fecha:</strong> {formatDate(update.date)}</p>
>>>>>>> a13ba1e8004e2776ea888d4b5bdba68e417a66ae
                  <p><strong>Cliente:</strong> {update.cliente}</p>
                  <p><strong>Placa:</strong> {update.placa}</p>
                  <p><strong>Tipo de Auto:</strong> {update.tipoAuto}</p>
                  <p><strong>Tipo de Servicio:</strong> {update.tipoServicio}</p>
<<<<<<< HEAD
                  <p><strong>Encargado:</strong> {update.encargado.encargadoNombre}</p>
                  <p><strong>Detalles del Auto:</strong> {update.carInfo}</p>
                  <p><strong>Precio:</strong> {update.precio}</p>
                  <p><strong>Modificado por:</strong> {update.usuario}</p>
=======
                  <p><strong>Encargado:</strong> {update.encargado}</p>
                  <p><strong>Detalles del Auto:</strong> {update.detalles}</p>
                  <p><strong>Precio:</strong> {update.precio}</p>
                  <p><strong>Precio:</strong> {update.usuario}</p>
>>>>>>> a13ba1e8004e2776ea888d4b5bdba68e417a66ae
                </div>
              ))}
            </div>
          )}
<<<<<<< HEAD

=======
>>>>>>> a13ba1e8004e2776ea888d4b5bdba68e417a66ae
          {error && <div className="error">{error}</div>}
        </div>
      )}
      
    </>
  );
};

export default ServiceMoreForm;