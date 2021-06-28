require("dotenv").config();

// Initialize sequelize & connect to DB
const { sequelize } = require("./sequelize");

// Person model created by sequelize
const { Person } = require("./sequelize");

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");

const bcrypt = require("bcrypt");

//  Register database adapter for Sequelize
AdminJS.registerAdapter(AdminJSSequelize);

const express = require("express");

const app = express();

const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  loginPath: "/admin/login",
  branding: {
    companyName: "New Company Name C.O.",
    logo: "http://racheltrana.com/images/neiu_logo.png",
  },
  resources: [
    {
      resource: Person,
      options: {
        // By default it goes under the database name ("localhost")
        // https://softwarebrothers.github.io/adminjs-dev/ResourceOptions.html#navigation
        navigation: {
          name: null,
          icon: "Bee",
        },
        // Specify the order when fields are shown in list
        listProperties: ["PERSONID", "FIRST", "LAST", "AGE"],

        // Specify which field is the title (shown when the screen size is small)
        properties: {
          FIRST: {
            isTitle: true,
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        People: "'People' table entries",
      },
      properties: {
        FIRST: "First name",
        LAST: "Last name",
        AGE: "Age",
      },
    },
  },
  dashboard: {
    component: AdminJS.bundle("new-dashboard"),
  },
});

const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMINJS_USER) {
      const pwMatch = bcrypt.compare(password, process.env.ADMINJS_PASS);
      return pwMatch;
    }
    return false;
  },
  cookiePassword: process.env.ADMINJS_COOKIE_PASS,
});

// Set admin-js router as a middleware in express
app.use(adminJS.options.rootPath, router);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 3000;
app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});

// TODO: Implement models in sequelize - this is required for admin-js to work properly
