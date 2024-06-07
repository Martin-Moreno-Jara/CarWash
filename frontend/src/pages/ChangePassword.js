import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useChangePassword } from "../hooks/usuarioHooks/useChangePassword";
import "../stylesheets/Login.css";

const ChangePassword = () => {
  const { changePassword, error, success, isLoading } = useChangePassword();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showPassword, setshowPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showRequirements, setShowRequirements] = useState(false);

  const handleNombreUsuario = (e) => {
    setNombreUsuario(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(
      nombreUsuario,
      password,
      newPassword,
      confirmNewPassword
    );
  };

  useEffect(() => {
    if (success) {
      setNombreUsuario("");
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [success]);

  return (
    <div className="overall-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="instruction-div">
          <h2>Cambiar Contraseña</h2>
          <p>Ingrese las credenciales y la nueva contraseña</p>
        </div>
        <div className="fields">
          <label>Nombre de usuario</label>
          <input type="text" onChange={handleNombreUsuario} />
          <label>Contraseña</label>
          <div className="field-div">
            <input
              className="password-field"
              type={showPassword ? "text" : "password"}
              onChange={handlePassword}
              value={password}
              autoComplete="off"
            />
            <span
              className="material-symbols-outlined see"
              onClick={() => {
                setshowPassword(!showPassword);
              }}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <label>Nueva Contraseña</label>
          <div className="field-div">
            <input
              className="password-field"
              type={showNewPassword ? "text" : "password"}
              onChange={handleNewPassword}
              value={newPassword}
              autoComplete="off"
            />
            <span
              className="material-symbols-outlined see"
              onClick={() => {
                setshowNewPassword(!showNewPassword);
              }}
            >
              {showNewPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <div className="password-requirements">
            <p
              onClick={() => setShowRequirements(!showRequirements)}
              style={{ cursor: "pointer" }}
            >
              La contraseña debe cumplir
              <span
                className="material-symbols-outlined"
                style={{
                  marginLeft: "1px",
                  verticalAlign: "middle",
                  fontSize: "16px",
                }}
              >
                {showRequirements ? "expand_less" : "expand_more"}
              </span>
            </p>
            {showRequirements && (
              <ul>
                <li>Mínimo una mayúscula y minúscula.</li>
                <li>Mínimo un número y carácter especial.</li>
                <li>Mínimo 8 caracteres.</li>
              </ul>
            )}
          </div>
          <label>Confirmar Nueva Contraseña</label>
          <div className="field-div">
            <input
              className="password-field"
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleConfirmNewPassword}
              value={confirmNewPassword}
              autoComplete="off"
            />
            <span
              className="material-symbols-outlined see"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
        </div>
        <button className="change-password-btn" disabled={isLoading}>
          Cambiar Contraseña
        </button>
        {isLoading && (
          <div className="loading">
            <MoonLoader color="#1c143d" loading={isLoading} size={100} />
          </div>
        )}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
