import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Category = db.define('product_category',{
    parent_category:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    slug:{
        type: DataTypes.STRING
    },
    foto:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

Category.belongsTo(Category, { 
    foreignKey: 'parent_category', 
    as: 'parent', 
    targetKey: 'id' 
});

export default Category;
