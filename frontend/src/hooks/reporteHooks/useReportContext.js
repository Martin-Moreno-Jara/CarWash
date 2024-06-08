//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { ReportContext } from "../../context/reporteContextos/ReportContext";
//**************************************************************

export const useReportContext = () => {
  const reporteContext = useContext(ReportContext);
  if (!reporteContext) {
    throw Error("reportContext used out of reach");
  }
  return reporteContext;
};