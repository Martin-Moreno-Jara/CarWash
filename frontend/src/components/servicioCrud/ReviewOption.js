import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSnackbar } from "notistack";
import { useServiceContext } from "../../hooks/servicioHooks/useServiceContext";

//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

const ReviewOption = ({
  icon,
  score,
  text,
  setShowReview,
  setShowConfirm,
  selectedRow,
}) => {
  const { usuario } = useAuthContext();
  const { dispatch } = useServiceContext();
  const { enqueueSnackbar } = useSnackbar();

  const close = () => {
    setShowReview(false);
    setShowConfirm(false);
  };
  const handleReview = async () => {
    const response = await fetch(
      `${apiURL}/api/servicioCRUD/complete/${selectedRow._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          calificacion: score,
        }),
      }
    );
    const updated = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_SERVICE", payload: updated });
      close();
    }
    if (!response.ok) {
      enqueueSnackbar("El servicio ya esta completado", { variant: "error" });
    }
  };

  return (
    <div className="rev-option" onClick={handleReview}>
      <span class="material-symbols-outlined">{icon}</span>
      <p>{text}</p>
    </div>
  );
};
export default ReviewOption;
