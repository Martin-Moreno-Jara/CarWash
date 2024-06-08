//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import { useEffect } from "react";
//STYLESHEET
import "../../stylesheets/ReportVisualize.css";
import { useAuthContext } from "../../hooks/useAuthContext";
const apiURL = process.env.REACT_APP_DEVURL;

//**************************************************************

const ReportVisualize = () => {
  const { usuario: loggedUser } = useAuthContext();

  const [blobPDF, setBlobPdf] = useState(null);

  useEffect(() => {
    const obtenerPDF = async () => {
      const getPDF = await fetch(`${apiURL}/api/reporte/fetchPDF`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser.token}`,
        },
      });
      if (!getPDF.ok) {
        const getPDF_response = await getPDF.json();
        console.log(`error: ${getPDF_response}`);
      }

      if (getPDF.ok) {
        const blob = await getPDF.blob();
        setBlobPdf(blob);
      }
    };

    obtenerPDF();
  }, [loggedUser.token]);

  return (
    <div className="main-container-report">
      <h2>Reporte</h2>
      <div className="container-visualize">
        <div className="text-content">
          {blobPDF ? (
            <iframe
              src={URL.createObjectURL(blobPDF)}
              width="100%"
              height="500px"
              title="PDF Preview"></iframe>
          ) : (
            <h2>Cargando PDF...</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReportVisualize;
