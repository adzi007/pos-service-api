import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
// import { multerCategory } from "./controllers/Category.js";
// import { multerProduct  } from "./controllers/Product.js";
// import Users from "./models/UserModel.js";
// import Category from "./models/Category.js";
// import Product from "./models/Product.js"
// import PosSession from "./models/PosSession.js";
// import PosOrder from "./models/PosOrder.js";
// import PosOrderList from "./models/PosOrderList.js";

dotenv.config();
const app = express();

console.log("connnnnnnntooooolllllll");
try {
    await db.authenticate();
    console.log("database conected...!");
    // await Users.sync();
    // await Category.sync();
    // await Product.sync();
    // await PosSession.sync();
    // await PosOrder.sync();
    // await PosOrderList.sync();
} catch (error) {
    console.log("error databasezzzz",error);
}

app.use(cors({ origin: true, credentials:true, origin:'http://localhost:3005' }));

const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/assets/category', express.static(path.join(__dirname, 'assets/category')));
app.use('/assets/product', express.static(path.join(__dirname, 'assets/product')));

// app.use('/images', express.static('images'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(router);

app.listen(5000, ()=> console.log('Server running at port 5000'));