import { DataTypes } from "sequelize";
import sequelize from "../config/database";

export default (sequelize) => {
    const Categoria = sequelize.define('Categoria',  {
 id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
     allowNull: false,
},

nome:{
    type:DataTypes.STRING(100)
}
        
    }) 
}