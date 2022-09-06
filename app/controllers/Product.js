import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, fn, col } from "sequelize";
import multer from "multer";
import { unlink } from 'fs/promises';
import path from "path";

// const baseUrl = process.env.BASE_URL;

const baseUrl = () => {
    return process.env.BASE_URL;
}

const imgProductStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/product');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileImgProductFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
         cb(null, true);
    }else{
        cb(null, false);
    }
} 

export const uploadProduct = multer({storage: imgProductStorage, fileFilter: fileImgProductFilter}).single('image');

export const addProduct = async (req, res) => {

    const { category_id, barcode, sku, name, product_type, price, discount, cost, stock, tax, parent_product_id } = req.body;
    const image = req.file.filename;

    console.log("stockxxxxxx", stock);
    

    try {

        let barcodeValue = true;

        if (barcode !== "") {
        
            let checkExixtBc = await Product.count({ where:{ barcode:barcode } });
            if(checkExixtBc > 0) barcodeValue = false;
        }


        if (barcode == "" || barcodeValue  ) {

            await Product.create({
                category_id:category_id,
                barcode:barcode,
                sku:sku,
                name:name,
                product_type:product_type,
                price:price,
                discount:discount,
                cost:cost,
                stock:stock,
                tax:tax,
                parent_product_id:parent_product_id,
                image:image
            });
    
            res.json({ 
                msg: "Add Product, success...!!!", 
                data:{
                    category_id:category_id,
                    barcode:barcode,
                    sku:sku,
                    name:name,
                    product_type:product_type,
                    price:price,
                    discount:discount,
                    cost:cost,
                    stock:stock,
                    tax:tax,
                    parent_product_id:parent_product_id,
                    image:image
                } 
            
            });
            
        }else{

            res.status(400).json({ msg:"barcode must be unique or empty" });

        }
        
    } catch (error) {

        res.status(400).json({ 
            msg: "Add Product, failed...!!!", 
            error:error
        
        }); 
    }

}

export const getProduct = async (req, res) => {

    let limit = 10;
    let page  = 1;
    let offset = 0;
    let keywordSearch = "";
    let condition = {};

    if(req.query.page !== undefined) page = parseInt(req.query.page)
    if(page > 1) offset = limit * (page - 1);

    if(req.query.search !== undefined){
        condition = {
            name: {
                [Op.like]: '%'+ req.query.search +'%'
            }
        }
    }

    let totalRows = await Product.count({ where:condition });

    let lastPage = Math.ceil(totalRows/limit);

    let products = await Product.findAll({
        attributes: ['id', 'barcode', 'sku', 'name', 'product_type', 'price', 'discount', 'cost', 'stock', 'tax', 'parent_product_id', [fn('CONCAT', baseUrl() + '/assets/product/', col('product.image')), 'image']],
        where:condition,
        order: [['id','DESC']],

        include: [
            {
              model: Product,
              required: false,
              as: 'parent',
              attributes: ['id', 'name'],
            },
            {
                model: Category,
                required: false,
                as: 'category',
                attributes: ['id', 'name'],
              },
        ],
        limit: limit,
        offset: offset,
    });

    let previousPage = null;
    let nextPage     = null;

    if(page > 1) previousPage = page - 1;
    if(page < lastPage) nextPage = page + 1;

    // console.log("products", products);


    res.json({ 
        msg: "daftar Produk",
        data:products,
        page:{
            curentPage:page,
            previousPage:previousPage,
            nextPage:nextPage,
            lastPage:lastPage,
            offset:offset
        }
    
    }); 

}


export const updateProduct = async (req, res) => {

    const productId = req.params.id;
    const { category_id, barcode, sku, name, product_type, price, discount, cost, stock, tax, parent_product_id } = req.body;
    let updatedData = {}

    if(req.file !== undefined){

        let imgProduct = await Product.findByPk(productId,{
            attributes: ['image']
        });

        if(imgProduct.image){
            const __dirname = path.resolve();
            await unlink(path.join(__dirname, 'assets/product/'+imgProduct.image));
        }

        updatedData = {
            category_id:category_id,
            barcode:barcode,
            sku:sku,
            name:name,
            product_type:product_type,
            price:price,
            discount:discount,
            cost:cost,
            stock:stock,
            tax:tax,
            parent_product_id:parent_product_id,
            image:req.file.filename
        }
    }else{

        updatedData = {
            category_id:category_id,
            barcode:barcode,
            sku:sku,
            name:name,
            product_type:product_type,
            price:price,
            discount:discount,
            cost:cost,
            stock:stock,
            tax:tax,
            parent_product_id:parent_product_id
        }
    }

    try {

        await Product.update(updatedData, {
            where: {
              id: productId
            }
        });
    
        res.json({ 
            msg: "success updated product...!",
            data: updatedData
        });
        
    } catch (error) {

        res.json({ 
            msg: "failed updated product...!",
            error: error
        });
    }

}

export const deleteProduct = async (req, res) => {
    try {

        const productId = req.params.id;

        let imgProduct = await Product.findByPk(productId,{
            attributes: ['image']
        });

        if(imgProduct.foto){
            const __dirname = path.resolve();
            await unlink(path.join(__dirname, 'assets/product/'+imgProduct.foto));
        }

        await Product.destroy({
            where: {
            id: productId
            }
        });
        
        res.json({ msg: "delete product, success...!!!" });
        
    } catch (error) {
        res.json({ msg: "delete product, failed...!!!", error:error });
    }
}

export const getProductById = async (req, res) => {

    try {

        const productId = req.params.id;
        let product = await Product.findByPk(productId,{
            attributes: ['id', 'barcode', 'sku', 'name', 'product_type', 'price', 'discount', 'cost', 'stock', 'tax', 'parent_product_id', [fn('CONCAT', baseUrl() + '/assets/product/', col('product.image')), 'foto'] ],
            include: [
                {
                  model: Product,
                  required: false,
                  as: 'parent',
                  attributes: ['id', 'name', [fn('CONCAT', baseUrl() + '/assets/product/', col('parent.image')), 'image']],
                },
                {
                    model: Category,
                    required: false,
                    as: 'category',
                    attributes: ['id', 'name'],
                  },
            ],
        });

        res.json({ data: product });
        
    } catch (error) {

        res.json({ msg: "failed get product by id", error:error });
        
    }
}

export const getProductByBarcode = async (req, res) => {

    try {

        const barcode = req.params.barcode;
        let product = await Product.findOne({
            where:{
                barcode:barcode
            },
            attributes: ['id', 'barcode', 'sku', 'name', 'product_type', 'price', 'discount', 'cost', 'stock', 'tax', 'parent_product_id', [fn('CONCAT', baseUrl() + '/assets/product/', col('product.image')), 'foto'] ],
            include: [
                {
                  model: Product,
                  required: false,
                  as: 'parent',
                  attributes: ['id', 'name'],
                },
                {
                    model: Category,
                    required: false,
                    as: 'category',
                    attributes: ['id', 'name'],
                  },
            ],
        });

        res.json({ data: product });
        
    } catch (error) {

        res.json({ msg: "failed get product by id", error:error });
        
    }
}