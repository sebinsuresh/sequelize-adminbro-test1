const { Sequelize, DataTypes } = require("sequelize");

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

const Person = sequelize.define(
  "Person",
  {
    PERSONID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FIRST: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    LAST: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    AGE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "People",
    timestamps: false,
  }
);

Person.sync();

module.exports = { sequelize, Person };
