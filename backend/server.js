require('dotenv').config();

const express = require('express');
const routes = require('./routes/rutas');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use('/api/routes', routes);

// db connection
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} and connected to db ${MONGO_URI}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
