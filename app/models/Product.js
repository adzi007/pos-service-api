import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./Category.js";

const { DataTypes } = Sequelize;

const Product = db.define('product',{

    category_id:{
        type: DataTypes.INTEGER
    },
    barcode:{
        type: DataTypes.STRING
    },
    sku:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    product_type:{
        type: DataTypes.ENUM('consumable','service','storable product')
    },
    price:{
        type: DataTypes.INTEGER
    },
    discount:{
        type: DataTypes.INTEGER
    },
    cost:{
        type: DataTypes.INTEGER
    },
    stock:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    tax:{
        type: DataTypes.FLOAT
    },
    parent_product_id:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true
});

Product.belongsTo(Product, { 
    foreignKey: 'parent_product_id', 
    as: 'parent', 
    targetKey: 'id' 
});

// Product.hasOne(Category, { 
//     foreignKey: 'category_id',
//     as: 'category',
//     targetKey: 'id'
// });

Product.belongsTo(Category, { 
    foreignKey: 'category_id',
    as: 'category',
    targetKey: 'id'
});



export default Product;
