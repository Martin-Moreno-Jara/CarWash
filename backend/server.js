require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user");
const empleadoCRUDRoutes = require("./routes/empleadoCRUD");
const servicioCRUDRoutes = require("./routes/servicioCRUD");
const tarifasRoutes = require("./routes/tarifas");
const mongoose = require("mongoose");
const cors = require("cors");
const reporteRoutes = require("./routes/reporte");
//const pdf = require("html-pdf");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/empleadoCRUD", empleadoCRUDRoutes);
app.use("/api/servicioCRUD", servicioCRUDRoutes);
app.use("/api/tarifas", tarifasRoutes);
app.use("/api/reporte", reporteRoutes);

// db connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and connected to db ${MONGO_URI}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
