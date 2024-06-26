module.exports = (initDate, endDate, serviceData, employeeData) => {
  const fechaHoy = new Date();
  const {
    numServicios = undefined,
    recaudo = undefined,
    servicesPerCar = undefined,
    ranking = undefined,
  } = serviceData || {};

  const {
    numEmpleados = undefined,
    eachEmployee = undefined,
    empleadosDespedidos = undefined,
    numServiciosEmpleado = undefined,
    recaudoEmpleado = undefined,
    calificacion = undefined,
    displayCalificacion = undefined,
    displayRecaudo = undefined,
    displayNumServicios = undefined,
    displayDespedidos = undefined,
  } = employeeData || {};
  console.log(displayDespedidos);

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reporte</title>
    <style>
    html{
    zoom:0.55
    }
    body {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    .header-section {
      background-color: #112339;
      color: white;
      width:100%;
      padding:1rem, 2.5rem;
    }
    .titles-text {
      color: #112339;
      margin: 10px 5px;
      font-size: 1.5rem;
    }
      .main-title {
        margin: 0rem 0.5rem;
        font-size: 3rem;
      }
      .subtitle {
        margin: 0rem 0.5rem;
        font-size: 1.5rem;
      }
      .normal-text {
        margin: 1rem 0.5rem;
      }
      .service-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      
      .car-and-services {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .employee-table {
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
      }
      .content-table {
        border-collapse: collapse;
        margin: 2rem 0;
      }
      .content-table thead tr {
        background-color: #112339;
        color: #fff;
        text-align: left;
        font-weight: bold;
      }
      .content-table th,
      .content-table td {
        padding: 12px 15px;
      }
      .content-table tr {
        border-bottom: 1px solid #ddd;
      }
      .content-table tr:nth-of-type(even) {
        background-color: #f3f3f3;
      }
      .content-table tr:last-of-type {
        border-bottom: 2px solid #112339;
      }
    </style>
  </head>
  <body>
    <section class="header-section">
      <div style="height: 200px; width:100%; padding:10px 15px;">
        <div class="header-text">
          <h1 class="main-title">REPORTE DEL NEGOCIO</h1>
          <h3 class="subtitle">CARWASH</h3>
          <p class="normal-text">Generado el <strong>${fechaHoy.getFullYear()}/${
    fechaHoy.getMonth() + 1
  }/${fechaHoy.getDate()}</strong></p>
          <p class="normal-text">Reportando desde <strong>${initDate.replaceAll(
            "-",
            "/"
          )}</strong> hasta <strong>${endDate.replaceAll("-", "/")}</strong></p>
        </div>
        <div style="width: 30%; position: relative; left: 80%; top: -155px">
          <img class="logo" src="https://i.imgur.com/9OKMWwr.jpg" />
        </div>  
      </div>
    </section>
    ${
      numServicios || recaudo || servicesPerCar || ranking
        ? `
    <section id="services-section">
      <h3 class="titles-text">Reporte de servicios</h3>
      <div style="padding:5px 15px">
      ${
        numServicios
          ? `<div style="display:inline-block;">
        <h4>Distribución servicio/estado</h4>
        <p> Total servicios: ${numServicios.total}</p>
        <p>Servicios terminados: ${numServicios.acabados}</p>
        <p>Servicios abiertos: ${numServicios.still}</p>
       </div>`
          : ""
      }

      ${
        recaudo
          ? `<div style="display:inline-block; margin-left:100px;">
          <h4>Dinero recaudado</h4>
          <span>Recaudo: $ ${new Intl.NumberFormat().format(recaudo)}</span>
          </div>`
          : ""
      }
        
        
    </div>
    ${
      servicesPerCar
        ? ` 
        <h4 style="padding:5px 15px;">Distribución servicio/vehículo</h4>
    <div style="position: relative; left: 5%; padding:5px 15px;">
    
      <table class="content-table" style="
      width: 85%;
      font-size: 0.8rem;">
        <thead>
          <th></th>
          ${
            servicesPerCar?.servicesNames
              ? `${servicesPerCar.servicesNames
                  .map((ser) => `<th>${ser.servicio}</th>`)
                  .join("")}`
              : ""
          }
          <th>Total</th>
        </thead>
        <tbody>
          <tr>
            <td>Carro</td>
            ${
              servicesPerCar?.carData
                ? `${servicesPerCar.carData
                    .map(
                      (data) => `<td style="text-align:center;">${data}</td>`
                    )
                    .join("")}`
                : ""
            }
          </tr>
          <tr>
            <td>Camioneta</td>
            ${
              servicesPerCar?.camionetaData
                ? `${servicesPerCar.camionetaData
                    .map(
                      (data) => `<td style="text-align:center;">${data}</td>`
                    )
                    .join("")}`
                : ""
            }
          </tr>
          <tr>
            <td>Total</td>
            ${
              servicesPerCar?.totalData
                ? `${servicesPerCar.totalData
                    .map(
                      (data) => `<td style="text-align:center;">${data}</td>`
                    )
                    .join("")}`
                : ""
            }
          </tr>
        </tbody>
      </table>
    </div>`
        : ""
    }
    
    ${
      ranking
        ? `
    <div class="ranking-div">
    <h4 style="padding:5px 15px;">Ranking de servicios según calificación</h4>
    <ol>
    ${ranking
      .map(
        (rank) =>
          ` <li>${rank.servicio} <span style="font-weight:bold;padding:15px ">(${rank.promedio})</span> </li>`
      )
      .join("")}
    </ol>
  </div>`
        : ""
    }
    
  </section>
  <hr />`
        : ""
    }
    ${
      displayNumServicios || displayRecaudo || displayCalificacion
        ? `<section id="reports-section">
    <h3 class="titles-text">Reporte de empleados</h3>
    ${
      displayNumServicios || displayRecaudo || displayCalificacion
        ? `<p style="padding:5px 15px;">Número de empleados: ${numEmpleados}`
        : ""
    }</p>
    <div style="position: relative; left: 20%">
      <table class="content-table">
  <thead>
    <tr>
    ${
      displayNumServicios || displayRecaudo || displayCalificacion
        ? `<th>Empleado</th>`
        : ""
    }

      ${displayNumServicios ? `<th>n. servicios</th>` : ""}
      ${displayRecaudo ? `<th>Dinero recaudado</th>` : ""}
      ${displayCalificacion ? `<th>Calificacion</th>` : ""}

    </tr>
  </thead>
  <tbody>
    ${eachEmployee
      .map(
        (data) =>
          `<tr>
          ${
            displayNumServicios || displayRecaudo || displayCalificacion
              ? `<td>${data.empleadoName}</td>`
              : ""
          }
            
        ${displayNumServicios ? `<td>${data.numServiciosEmpleado}</td>` : ""}
        ${
          displayRecaudo
            ? ` <td>$ ${new Intl.NumberFormat().format(
                data.recaudoEmpleado
              )}</td>`
            : ""
        }
        ${displayCalificacion ? ` <td>${data.calificacion}</td>` : ""}
      </tr>`
      )
      .join("")}
  
  </tbody>
</table>
    </div>
  ${
    displayDespedidos
      ? `
  <h4 class="titles-text">Empleados despedidos</h4>
  <
  <div style="position: relative; left: 20%">
      <table class="content-table">
  <thead>
    <tr>
    ${
      displayNumServicios || displayRecaudo || displayCalificacion
        ? `<th>Empleado</th>`
        : ""
    }

      ${displayNumServicios ? `<th>n. servicios</th>` : ""}
      ${displayRecaudo ? `<th>Dinero recaudado</th>` : ""}
      ${displayCalificacion ? `<th>Calificacion</th>` : ""}

    </tr>
  </thead>
  <tbody>
    ${empleadosDespedidos
      .map(
        (data) =>
          `<tr>
          ${
            displayNumServicios || displayRecaudo || displayCalificacion
              ? `<td>${data.empleadoName}</td>`
              : ""
          }
            
        ${displayNumServicios ? `<td>${data.numServiciosEmpleado}</td>` : ""}
        ${
          displayRecaudo
            ? ` <td>$ ${new Intl.NumberFormat().format(
                data.recaudoEmpleado
              )}</td>`
            : ""
        }
        ${displayCalificacion ? ` <td>${data.calificacion}</td>` : ""}
      </tr>`
      )
      .join("")}
  
  </tbody>
</table>
    </div>
  `
      : ""
  }
  </section>`
        : ""
    }
  </body>
</html>
  `;
};
