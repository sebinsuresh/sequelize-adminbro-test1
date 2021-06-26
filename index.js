require("dotenv").config();

// Initialize sequelize & connect to DB
const { sequelize } = require("./sequelize");

// Person model created by sequelize
const { Person } = require("./sequelize");

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");

//  Register database adapter for Sequelize
AdminJS.registerAdapter(AdminJSSequelize);

const express = require("express");

const app = express();

const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  loginPath: "/admin/login",
});

const router = AdminJSExpress.buildRouter(adminJS);

// Set admin-js router as a middleware in express
app.use(adminJS.options.rootPath, router);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/admin/login", (req, res) => {
  res.send("Not implemented yet!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// TODO: Implement models in sequelize - this is required for admin-js to work properly
