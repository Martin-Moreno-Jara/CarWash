import { useState } from "react";
const apiURL = process.env.REACT_APP_DEVURL;

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRequirements.test(password);
  };

  const actualizarPrimeraVez = async (usuario) => {
    const response = await fetch(`${apiURL}/api/user/update-first-time`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error);
    }
    return json.message;
  };

  const changePassword = async (
    usuario,
    contrasena,
    nuevaContrasena,
    confirmNewPassword
  ) => {
    setIsLoading(true);
    setError(null);

    if (usuario === "raulJm") {
      setIsLoading(false);
      return setError("El administrador no puede cambiar su contraseña");
    }

    if (!validatePassword(nuevaContrasena)) {
      setIsLoading(false);
      return setError("La nueva contraseña no cumple con los requisitos");
    }

    if (contrasena === nuevaContrasena) {
      setIsLoading(false);
      return setError("Las nueva contraseña es igual a la anterior");
    }

    if (nuevaContrasena !== confirmNewPassword) {
      setIsLoading(false);
      return setError("Las nuevas contraseñas no coinciden");
    }

    const response = await fetch(`${apiURL}/api/user/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena, nuevaContrasena }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      await actualizarPrimeraVez(usuario);
      setIsLoading(false);
      setError(null);
      setSuccess("Contraseña actualizada con éxito");
    }
  };

  return { changePassword, error, isLoading, success };
};
