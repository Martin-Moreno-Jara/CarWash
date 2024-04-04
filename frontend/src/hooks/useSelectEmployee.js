import { useEmployeeContext } from "./useEmployeeContext";
export const useSelectEmployee = () => {
  const { selected, dispatch } = useEmployeeContext();
  const selectEmployee = () => {
    dispatch({ type: "SELECT", payload: !selected });
  };
  return { selectEmployee };
};
