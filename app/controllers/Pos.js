import Category from "../models/Category.js";
import Product from "../models/Product.js";
import PosSession from "../models/PosSession.js";
import jwt from "jsonwebtoken";
import { Op, fn, col } from "sequelize";
import moment from "moment";

export const createSession = async (req, res) => {

    try {

        const { user_id, status } = req.body;

        await PosSession.create({
            user_id:user_id,
            status:"working on"
        });

        res.json({ 
            msg: "Create POS Session, success...!!!", 
            data:{
                user_id:user_id,
                status:"working on"
            } 
        
        });
        
    } catch (error) {

        res.status(400).json({ 
            msg: "Create POS Session, failed...!!!", 
            error:error
        
        });
        
    }

}


export const pauseSession = async (req, res) => {

    const { user_id } = req.body;

    await PosSession.update({
        status: "pause"
    },{
        where: {
            user_id:user_id,
            end: null
    
        }
    });

    res.json({ 
        msg: "Pause POS Session, success...!!!",
    });

}

export const endSession = async (req, res) => {

    const { user_id } = req.body;
    let end = moment().format('YYYY-MM-DD H:mm:ss');
    // let endx = new Date(end);

    console.log("endx", end);
    // console.log("end", typeof end);
    // let end = new Date()
    await PosSession.update({
        status: "done",
        end: end
    },{
        where: {
            user_id:user_id,
            end: null
        }
    });

    res.json({ 
        msg: "ending POS Session, success...!!!",
        end: end
    });
}