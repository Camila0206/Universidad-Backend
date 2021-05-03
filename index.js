/** 
 * ARCHIVO PRINCIPAL
 */

 const express = require('express');
 const router = require('./app/routers/index');
 const app = express();
 const path = require("path");

 app.use(express.json());
 app.use('/', router)

 app.use(express.static(path.join(__dirname, "public")));
 app.use("/docs", express.static(path.join(__dirname, "docs")));

const port = 3001;
app.listen(port, () => {
    console.log('Server Started on port http://localhost:3001');
});
