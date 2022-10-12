import Sequelize from "sequelize";

export const sequelize = new Sequelize("cursos", "root", "Admin$2021$A", {
  host: "144.126.136.14",
  dialect: "postgres",
});
