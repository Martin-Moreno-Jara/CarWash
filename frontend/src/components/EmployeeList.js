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
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import { useSelectContext } from "../hooks/useSelectContext";
//ENV VARIABLE API
const apiURL = process.env.REACT_APP_DEPLOYURL;

//FETCH EMPLOYEES FOR THE TABLE
const EmployeeList = () => {
  const { selectedEmployee, dispatch: dispatchIsSelected } = useSelectContext();

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

  const [columnFilters, setColumnFilters] = useState("");

  const table = useReactTable({
    data: empleados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: columnFilters,
    },
    onGlobalFilterChange: setColumnFilters,
  });
  return (
    <div
      className={
        show || showEdit ? "empleadoLista-main-noblur" : "empleadoLista-main"
      }
    >
      <input
        type="text"
        placeholder="Búsqueda"
        onChange={(e) => setColumnFilters(e.target.value)}
      />
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
