module.exports = (initDate, endDate, serviceData, empleados) => {
  const fechaHoy = new Date();
  console.log({ serviceData });
  const {
    numServiciosTotal = undefined,
    numServiciosAcabados = undefined,
    numServiciosStill = undefined,
    recaudo = undefined,
    servicePerCar = undefined,
    ranking = undefined,
  } = serviceData || {};

  console.log(numServiciosTotal, numServiciosAcabados, numServiciosStill);
  const { serviceEmleado, recaudado, calificacion } = empleados | undefined;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reporte</title>
    <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    .header-section {
      background-color: #112339;
      color: white;
      width:100%;
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
      <div style="height: 200px; width:100%;">
        <div class="header-text">
          <h1 class="main-title">REPORTE DEL NEGOCIO</h1>
          <h3 class="subtitle">CARWASH</h3>
          <p class="normal-text">Generado el ${fechaHoy.getDate()}/${
    fechaHoy.getMonth() + 1
  }/${fechaHoy.getFullYear()}</p 2024-2-5>
          <p class="normal-text">Reportando desde ${initDate.replaceAll(
            "-",
            "/"
          )} hasta ${endDate.replaceAll("-", "/")}</p>
        </div>
        <div style="width: 30%; position: relative; left: 80%; top: -155px">
          <img class="logo" src="https://i.imgur.com/9OKMWwr.jpg" />
        </div>
        
      </div>
    </section>
    ${
      serviceData
        ? `<section id="services-section">
    <h3 class="titles-text">Reporte de servicios</h3>
    <div style="width: 40%">
      <ul style="display: inline">
      ${recaudo ? `<li>Recaudo: ${recaudo}</li>` : ""}
        
        ${
          numServiciosTotal
            ? `<li>Total servicios:${numServiciosTotal}</li>`
            : ""
        }
      </ul>
      ${
        numServiciosAcabados && numServiciosStill
          ? `
          <div style="width: 40%; position: relative; left: 50%; bottom: 60px">
            <table class="content-table">
              <thead>
                <th>Servicios terminados</th>
                <th>Servicios abiertos</th>
              </thead>
              <tbody>
                <tr>
                  <td>${numServiciosAcabados}</td>
                  <td>${numServiciosStill}</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
          : ""
      }
    </div>
    <div style="position: relative; left: 20%">
      <table class="content-table">
        <thead>
          <th></th>
          <th>Servicio 1</th>
          <th>Servicio 2</th>
          <th>Servicio 3</th>
          <th>Servicio 4</th>
          <th>Servicio 5</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr>
            <td>Carro</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
          <tr>
            <td>Camioneta</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ranking-div">
      <h4>Ranking de servicios</h4>
      <ol>
        <li>service 1</li>
        <li>service 2</li>
        <li>service 3</li>
        <li>service 4</li>
        <li>service 5</li>
      </ol>
    </div>
  </section>
  <hr />`
        : ""
    }
    ${
      empleados
        ? `<section id="reports-section">
    <h3 class="titles-text">Reporte de empleados</h3>
    <p>Número de empleados: ##</p>
    <div style="position: relative; left: 20%">
      <table class="content-table">
        <thead>
          <th></th>
          <th>n. servicios</th>
          <th>Dinero recaudado</th>
          <th>Calificacion</th>
        </thead>
        <tbody>
          <tr>
            <td>Empleado 1</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
          <tr>
            <td>Empleado 2</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
          <tr>
            <td>Empleado 3</td>
            <td>##(%)</td>
            <td>##(%)</td>
            <td>##(%)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`
        : ""
    }
    
  </body>
</html>
  
    `;
};
