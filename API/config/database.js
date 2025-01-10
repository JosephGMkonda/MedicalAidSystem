import { Sequelize } from "sequelize";


export const db = new Sequelize('auth_db','root','',{
    host: "localhost",
    dialect: "mysql"
});
