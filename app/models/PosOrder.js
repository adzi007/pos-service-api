import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PosSession from "./PosSession.js";

import PosOrderList from "./PosOrderList.js";

const { DataTypes } = Sequelize;

const PosOrder = db.define('pos_order', {

    pos_order_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    session_id: {
        type: DataTypes.INTEGER
    },
    customer_id: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    }, 
    total_price: {
        type: DataTypes.INTEGER
    },
    customer_pay: {
        type: DataTypes.INTEGER
    },
    change: {
        type: DataTypes.INTEGER
    },
},{
    freezeTableName:true
});

PosOrder.hasMany(PosOrderList, { 
    foreignKey: 'pos_order_id',
    onDelete: 'CASADE',
    onUpdate: 'CASADE',
    as: 'pos_order_list' 
});

// PosOrder.belongsTo(PosSession, { 
//     foreignKey: 'session_id',
//     as: 'session',
//     targetKey: 'session_id'
// });

// PosOrder.associate = model => {
//     PosOrder.hasMany(model.PosOrderList);
// }

// PosOrder.hasMany(PosOrderList, { as: "list_product" });

// PosOrder.hasMany(PosOrderList);

// Sequelize.model(PosOrder).hasMany(PosOrderList);


export default PosOrder;
