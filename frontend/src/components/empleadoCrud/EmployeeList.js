//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
//CUSTOM HOOKS
import { useEmployeeContext } from "../../hooks/empleadoHooks/useEmployeeContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEmployeeCrudContext } from "../../hooks/empleadoHooks/useEmployeeCrudContext";
import { useSelectContext } from "../../hooks/empleadoHooks/useSelectContext";
//COMPONENTS
import EmployeeInfo from "./EmployeeInfo";
//STYLESHEET
import "../../stylesheets/EmployeeList.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

//FETCH EMPLOYEES FOR THE TABLE
const EmployeeList = () => {
  const { selectedEmployee, dispatch: dispatchIsSelected } = useSelectContext();

  const columns = [
    {
      header: "Nombre",
      accessorFn: (row) => `${row.nombre} ${row.apellido}`,
      //accessorKey: "nombre",
      //cell: ({ row }) => `${row.original.nombre} ${row.original.apellido}`,
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
      accessorKey: "Acciones",
      cell: ({ row }) => <EmployeeInfo id={row.original._id} />,
    },
  ];
  const { empleados, dispatch } = useEmployeeContext();
  const { show, showEdit, dispatch: dispatchEdit } = useEmployeeCrudContext();
  const [isLoading, setIsLoading] = useState(null);
  const { usuario } = useAuthContext();

  useEffect(() => {
    console.log(usuario);
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiURL}/api/empleadoCRUD`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        console.log(json);
        throw Error("No se pudieron traer empleados");
      }
      if (response.ok) {
        setIsLoading(false);
        dispatch({ type: "SET_EMPLEADOS", payload: json });
      }
    };
    fetchEmployees();
  }, [dispatch, usuario]);

  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: empleados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: columnFilters,
      sorting,
    },
    onGlobalFilterChange: setColumnFilters,
    onSortingChange: setSorting,
  });
  return (
    <div
      className={
        show || showEdit ? "empleadoLista-main-noblur" : "empleadoLista-main"
      }
    >
      <input
        className="search-input"
        type="text"
        placeholder="Búsqueda"
        onChange={(e) => setColumnFilters(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: "⬆️", desc: "⬇️" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {empleados &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} data-cell={cell.column.columnDef.header}>
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
      {/* <button onClick={() => table.setPageIndex(0)}>Primera</button>
      <button
        onClick={() => {
          table.previousPage();
        }}
      >
        Anterior
      </button>
      <button
        onClick={() => {
          table.nextPage();
        }}
      >
        Siguiente
      </button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Última
      </button> */}
    </div>
  );
};
export default EmployeeList;
