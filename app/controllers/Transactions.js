
import PosOrder from "../models/PosOrder.js";
import PosOrderList from "../models/PosOrderList.js";

// import { PosOrder, PosOrderList } from "../models/TrxModel.js";
import jwt from "jsonwebtoken";
import { Op, fn, col } from "sequelize";
import moment from "moment";
import Product from "../models/Product.js";

const baseUrl = () => {
    return process.env.BASE_URL;
}

export const insertTractaction = async (req, res) => {

    const { session_id, customer_id, date, total_price, customer_pay, change, product_list } = req.body;

    const trx = await PosOrder.create({
        session_id: session_id, 
        customer_id: customer_id, 
        total_price: total_price, 
        customer_pay: customer_pay, 
        change: change
    });

    let pos_order_id = trx.pos_order_id;

    let trxItemList = []

    for (let index = 0; index < product_list.length; index++) {
        
        let trxItem = {
            pos_order_id: pos_order_id,
            product_id : product_list[index].product_id,
            qty : product_list[index].qty,
            sub_total_price : product_list[index].sub_total_price,
        }

        trxItemList.push(trxItem);
    }

    await PosOrderList.bulkCreate(trxItemList);


    res.json({
        msg: "post new trx",
        product_list: product_list
    });
}

export const getAllTransaction = async (req, res) => {

    let limit = 2;
    let page  = 1;
    let offset = 0;
    let keywordSearch = "";
    let condition = {};

    if(req.query.page !== undefined) page = parseInt(req.query.page)
    if(page > 1) offset = limit * (page - 1);

    let totalRows = await PosOrder.count({ where:condition });

    let lastPage = Math.ceil(totalRows/limit);

    const trx = await PosOrder.findAll({ 
        attributes:[ ['createdAt','date'], 'pos_order_id', 'session_id', 'customer_id', 'total_price', 'customer_pay', 'change'],
        order: [['pos_order_id','DESC']],
        include: { 
            model: PosOrderList, 
            as: 'pos_order_list',
            attributes:['id', 'product_id', 'qty', 'sub_total_price', 'createdAt'],
            include: {
                model: Product,
                as: 'product',
                attributes:['id', 'name', [fn('CONCAT', baseUrl() + '/assets/product/', col('image')), 'image']]
            }
        },
        limit: limit,
        offset: offset,
    });

    let previousPage = null;
    let nextPage     = null;

    if(page > 1) previousPage = page - 1;
    if(page < lastPage) nextPage = page + 1;

    res.json({
        msg: "transaction",
        data:trx,
        page:{
            curentPage:page,
            previousPage:previousPage,
            nextPage:nextPage,
            lastPage:lastPage
        }
    });

}