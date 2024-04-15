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
import { useSelectContext } from "../hooks/useSelectContext";
//ENV VARIABLE API
const apiURL = process.env.REACT_APP_DEPLOYURL;

//FETCH EMPLOYEES FOR THE TABLE
const EmployeeList = () => {
  const { selectedEmployee, dispatch: dispatchIsSelected } = useSelectContext();
  const handleDelete = async (e) => {
    const id = e.target.value;
    console.log(id);
    dispatchIsSelected({
      type: "SELECT_EMPLOYEE",
      payload: id,
    });
    const response = await fetch(
      `${apiURL}/api/empleadoCRUD/${selectedEmployee}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    dispatch({ type: "DELETE_EMPLEADO", payload: json });
  };

  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
      cell: ({ row }) => `${row.original.nombre} ${row.original.apellido}`,
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
      cell: ({ row }) => <EmployeeInfo id={row.original._id} />,
    },
  ];
  const { empleados, dispatch } = useEmployeeContext();
  const { show, showEdit, dispatch: dispatchEdit } = useEmployeeCrudContext();
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

          {/* {empleados &&
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
            ))} */}
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
