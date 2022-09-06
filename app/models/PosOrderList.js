import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PosOrder from "./PosOrder.js";
import Product from "./Product.js";

const { DataTypes } = Sequelize;

const PosOrderList = db.define('pos_order_list', {

    pos_order_id: {
        type: DataTypes.INTEGER
    },  
    product_id: {
        type: DataTypes.INTEGER
    },     
    qty: {
        type: DataTypes.INTEGER
    },  
    sub_total_price: {
        type: DataTypes.INTEGER
    }
    
},{
    freezeTableName:true
});


// PosOrderList.associate = model => {

//     // PosOrder.hasMany(model.PosOrderList);
//     PosOrderList.belongsTo(model.PosOrder, { 
//         foreignKey: 'pos_order_id',
//         as: 'pos_order',
//         targetKey: 'pos_order_id'
//     });
// }

// PosOrderList.belongsTo(PosOrder, { 
//     foreignKey: 'pos_order_id',
//     as: 'pos_order',
//     targetKey: 'pos_order_id'
// });

PosOrderList.belongsTo(Product, { 
    foreignKey: 'product_id',
    as: 'product',
    targetKey: 'id'
});


export default PosOrderList;