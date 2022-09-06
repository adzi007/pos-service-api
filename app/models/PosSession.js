import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const PosSession = db.define('pos_session',{

    session_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    createdAt: {
        field: 'start',
        type: DataTypes.DATE,
    },
    user_id:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.ENUM('working on','pause','done')
    },
    end:{
        type: DataTypes.DATE
    },
   
},{
    freezeTableName:true
});

PosSession.belongsTo(Users, { 
    foreignKey: 'user_id',
    as: 'user',
    targetKey: 'id'
});



export default PosSession;
