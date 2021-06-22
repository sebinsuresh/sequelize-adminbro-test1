require("dotenv").config();

// Initialize sequelize & connect to DB
const { sequelize } = require("./sequelize");

// Person model created by sequelize
const { Person } = require("./sequelize");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");

//  Register database adapter for Sequelize
AdminBro.registerAdapter(AdminBroSequelize);

const express = require("express");

const app = express();

const adminBro = new AdminBro({
  databases: [sequelize],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);

// Set admin-bro router as a middleware in express
app.use(adminBro.options.rootPath, router);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// TODO: Implement models in sequelize - this is required for admin-bro to work properly
