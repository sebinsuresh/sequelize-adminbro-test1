require("dotenv").config();

const express = require("express");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

// Ensuring sequelize connection is proper
try {
  sequelize
    .authenticate()
    .then((val) => {
      console.log(
        "Connection has been established successfully (if u made it this far)."
      );
    })
    .catch((err) => console.log(`some went wrong`, err));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  // Query using sequelize. It is promise based.
  sequelize
    .query(
      // Query itself can be passed in as string, or as an option
      // in the next parameter
      "SELECT * FROM test_table",
      // By default the result & metadata are returned.
      // To get only the result back - declare this as a SELECT query.
      // From: https://stackoverflow.com/a/33242480
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((val) => {
      console.log("actual log", val);

      // Testing promise syntax: Whatever is returned here will be
      // passed as argument to the next ".then()".
      return 25;
    })
    .then((val) => {
      // Here, val === 25
      console.log(`Value in second .then: ${val}`);
    })
    .catch((error) => {
      console.error("Some error happened when querying:", error);
    });
});
