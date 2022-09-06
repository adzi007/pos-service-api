import {Sequelize} from "sequelize";

const db = new Sequelize('asteriska_pos','root','123456',{
    host: "172.29.0.2",
    dialect: "mysql",
    port: 3306,
    dialectOptions: {
        useUTC: false, // for reading from database
        // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    },
    // define: {
    //     timestamps: false,
    //     freezeTableName: true
    // }
    timezone: '+07:00', // for writing to database
});


// const sequelize = new Sequelize(
//     process.env.DB,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         port: process.env.DB_PORT,
//         dialectOptions: {
//             ssl: {
//                 rejectUnauthorized: true,
//                 ca: serverCa
//             }
//         },
//         define: {
//             timestamps: false,
//             freezeTableName: true
//         }
//     }
// )

export default db;