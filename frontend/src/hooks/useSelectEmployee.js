import { useEmployeeContext } from "./useEmployeeReducer";
export const useSelectEmployee = () => {
  const { selected, dispatch } = useEmployeeContext();
  const selectEmployee = () => {
    dispatch({ type: "SELECT", payload: !selected });
  };
  return { selectEmployee };
};
