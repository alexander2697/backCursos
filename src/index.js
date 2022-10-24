// import app from "./app.js";
// import { sequelize } from "./database/database.js";

// async function main() {
//  try {
//     await sequelize.sync({force: false});
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     app.listen(4000);
//     console.log("Server in listening on port", 4000);
//  } catch (error) {
//     console.error('Unable to connect to the database:', error);
//  }
// }


// main();

const express = require('express');
const app = express();
const port = 2000;

app.listen(port);
console.log(`Server listen on port ${port}`);
app.use(express.json());


require('./routes/Users.routes')(app);

