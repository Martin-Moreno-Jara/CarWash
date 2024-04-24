//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
//CUSTOM HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
import { useServiceContext } from "../../hooks/servicioHooks/useServiceContext";
//COMPONENTS
//STYLESHEET
import "../../stylesheets/ServiceList.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

//**************************************************************

const ServiceList = () => {
  const { usuario } = useAuthContext();
  const { servicios, dispatch } = useServiceContext();

  //Traer los datos para la tabla
  useEffect(() => {
    const fetchAllServies = async () => {
      const response = await fetch(`${apiURL}/api/servicioCRUD`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error(`no se pudo porque: ${json}`);
      }
      if (response.ok) {
        dispatch({ type: "SET_SERVICES", payload: json });
      }
    };
    const fetchServicesByEmployee = async () => {
      const response = await fetch(
        `${apiURL}/api/servicioCRUD/employee/${usuario.id}`,
        {
          headers: { Authorization: `Bearer ${usuario.token}` },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw Error(`no se pudo porque: ${json}`);
      }
      if (response.ok) {
        dispatch({ type: "SET_SERVICES", payload: json });
      }
    };
    if (usuario.rol === "administrador") {
      fetchAllServies();
    }
    if (usuario.rol === "empleado") {
      fetchServicesByEmployee();
    }
  }, [usuario.id, usuario.rol, usuario.token, dispatch]);

  //configuraciones para la tabla
  const columns = [
    { header: "Placa", accessorKey: "placa" },
    { header: "Cliente", accessorKey: "cliente" },
    { header: "Tipo de Auto", accessorKey: "tipoAuto" },
    { header: "Servicio", accessorKey: "tipoServicio" },
    { header: "Precio", accessorKey: "precio" },
    {
      header: "Estado",
      accessorKey: "estado",
      cell: ({ row }) => (
        <div
          className={
            row.original.estado === "Terminado"
              ? "estado-terminado"
              : "estado-en-proceso"
          }
        >
          {row.original.estado}
        </div>
      ),
    },
    { header: "Acciones", accessorKey: "acciones" },
  ];
  const adminColumns = [
    ...columns.slice(0, 6),
    {
      header: "Encargado",
      accessorFn: (row) =>
        `${row.encargado[0].encargadoUsuario} (${
          row.encargado[0].encargadoNombre.split(" ")[0]
        })`,
    },
    ...columns.slice(6),
  ];

  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);
  //Hook de la tabla
  const table = useReactTable({
    data: servicios,
    columns: usuario.rol === "administrador" ? adminColumns : columns,
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
    <div className="empleadoLista-main">
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
          {servicios &&
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
      {/* {isLoading && (
        <div className="loading">
          <MoonLoader color="#1c143d" loading={isLoading} size={100} />
        </div>
      )} */}
      <button onClick={() => table.setPageIndex(0)}>Primera</button>
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
      </button>
    </div>
  );
};
export default ServiceList;
