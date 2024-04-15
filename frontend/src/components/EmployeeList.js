//MODULES IMPORTED
import { useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import "../stylesheets/EmployeeList.css";
import MoonLoader from "react-spinners/MoonLoader";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
//ENV VARIABLE API
const apiURL = process.env.REACT_APP_DEPLOYURL;

//FETCH EMPLOYEES FOR THE TABLE
const EmployeeList = () => {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Usuario",
      accessorKey: "usuario",
    },
    {
      header: "Teléfono",
      accessorKey: "telefono",
    },
    {
      header: "Cédula",
      accessorKey: "cedula",
    },
    {
      header: "Acciones",
      accessorKey: "acciones",
    },
  ];
  const { empleados, dispatch } = useEmployeeContext();
  const { show, showEdit } = useEmployeeCrudContext();
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiURL}/api/empleadoCRUD`);
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        throw Error("No se pudieron traer empleados");
      }
      if (response.ok) {
        setIsLoading(false);
        dispatch({ type: "SET_EMPLEADOS", payload: json });
      }
    };
    fetchEmployees();
  }, [dispatch]);

  const table = useReactTable({
    data: empleados,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div
      className={
        show || showEdit ? "empleadoLista-main-noblur" : "empleadoLista-main"
      }
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {empleados &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

          {empleados &&
            empleados.map((empleado) => (
              <>
                {
                  <EmployeeInfo
                    id={empleado._id}
                    nombre={empleado.nombre}
                    apellido={empleado.apellido}
                    usuario={empleado.usuario}
                    telefono={empleado.telefono}
                    cedula={empleado.cedula}
                  />
                }
              </>
            ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="loading">
          <MoonLoader color="#1c143d" loading={isLoading} size={100} />
        </div>
      )}
    </div>
  );
};
export default EmployeeList;
