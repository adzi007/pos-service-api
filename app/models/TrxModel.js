import PosOrder from "./PosOrder.js";
import PosOrderList from "./PosOrderList.js";

// PosOrderList.belongsTo(PosOrder, { 
//     foreignKey: 'pos_order_id',
//     as: 'pos_order',
//     targetKey: 'pos_order_id'
// });

// PosOrder.hasMany(PosOrderList);
// PosOrder.hasMany(PosOrderList, { as: "pos_order_list" });

// PosOrder.hasMany(PosOrderList);
// // PosOrderList.belongsTo(PosOrder);
// PosOrderList.belongsTo(PosOrder, { 
//     foreignKey: 'pos_order_id',
//     as: 'pos_order',
//     targetKey: 'pos_order_id'
// });
// PosOrder.hasMany(PosOrderList, { 
//     foreignKey: 'pos_order_id',
//     onDelete: 'CASADE',
//     onUpdate: 'CASADE',
//     as: 'pos_order_list' 
// });

export { PosOrder, PosOrderList };