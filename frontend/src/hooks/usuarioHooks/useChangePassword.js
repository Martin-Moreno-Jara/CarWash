import { useState } from "react";
const apiURL = process.env.REACT_APP_DEVURL;

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRequirements.test(password);
  };

  const changePassword = async (usuario, contrasena, newPassword, confirmNewPassword) => {
    setIsLoading(true);
    setError(null);

    if (usuario === "raulJm") {
      setIsLoading(false);
      return setError("El administrador no puede cambiar su contraseña");
    }

    if (!validatePassword(newPassword)) {
      setIsLoading(false);
      return setError("La nueva contraseña no cumple con los requisitos");
    }

    if (newPassword !== confirmNewPassword) {
      setIsLoading(false);
      return setError("Las nuevas contraseñas no coinciden");
    }


    const response = await fetch(`${apiURL}/api/user/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena, newPassword }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      setIsLoading(false);
      setError(null);
    }
  };

  return { changePassword, error, isLoading };
};