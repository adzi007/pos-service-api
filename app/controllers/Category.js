import express from "express";
import Category from "../models/Category.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, fn, col } from "sequelize";
import multer from "multer";
import { unlink } from 'fs/promises';
import path from "path";

// const app = express();

const baseUrl = () => {
    return process.env.BASE_URL;
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/category');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
         cb(null, true);
    }else{
        cb(null, false);
    }
} 

export const uploadCategory = multer({storage: fileStorage, fileFilter: fileFilter}).single('foto');
// export const multerCategory = multer({storage: fileStorage, fileFilter: fileFilter}).array('foto[]', 5);

export const addCategory = async (req, res) => {

    const { parent_category, name, slug } = req.body;

    // const image = req.files;
    // const image = req.file.paty;

    const foto = req.file.filename;
    try {

        await Category.create({
            parent_category:parent_category,
            name:name,
            slug:slug,
            foto:foto
        })

        res.json({ 
            msg: "Add category, success...!!!", 
            data:{
                parent_category: parent_category,
                name: name,
                slug: slug,
                foto: foto
            } 
        
        });
        
    } catch (error) {
        
    }


}


export const getCategory = async (req, res) => {

    let limit = 5;
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

    let totalRows = await Category.count({ where:condition });

    let lastPage = Math.ceil(totalRows/limit);

    let category = await Category.findAll({
        attributes: ['id', 'parent_category', 'name', 'slug', [fn('CONCAT', baseUrl() + '/assets/category/', col('product_category.foto')), 'foto']],
        where:condition,
        order: ['parent_category'],
        include: [
            {
              model: Category,
              required: false,
              as: 'parent',
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

    res.json({ 
        msg: "daftar category",
        data: category,
        page:{
            curentPage:page,
            previousPage:previousPage,
            nextPage:nextPage,
            lastPage:lastPage,
            totalRows:totalRows,
            offset:offset
        }
        
    });

}


export const getCategoryById = async (req, res) => {


    const categoryId = req.params.id;

    let category = await Category.findByPk(categoryId, {
        attributes: ['id', 'parent_category', 'name', 'slug', [fn('CONCAT', baseUrl() + '/assets/category/', col('product_category.foto')), 'foto']],
        order: ['parent_category'],
        include: [
            {
              model: Category,
              required: false,
              as: 'parent',
              attributes: ['id', 'name'],
            },
        ]
    });

    res.json({ data: category });

}

export const getCategoryForForm = async (req, res) => {
    

    let category = await Category.findAll({
        attributes: ['id', 'name'],
        order: ['name'],
    });

    res.json({ 
        msg: "daftar category",
        data: category,
        page: {}
        
    });
}

//1639934593318-download2.jpg
export const updateCategory = async (req, res) => {

    const categoryId = req.params.id;
    const { parent_category, name, slug } = req.body;
    let updatedData = {}

    if(req.file !== undefined){

        let imgCategory = await Category.findByPk(categoryId,{
            attributes: ['foto']
        });

        if(imgCategory.foto){
            const __dirname = path.resolve();
            await unlink(path.join(__dirname, 'assets/category/'+imgCategory.foto));
        }

        updatedData = {
            parent_category:parent_category,
            name:name,
            slug:slug,
            foto:req.file.filename
        }
    }else{
        updatedData = {
            parent_category:parent_category,
            name:name,
            slug:slug
        }
    }

    try {

        await Category.update(updatedData, {
            where: {
              id: categoryId
            }
        });
    
        res.json({ 
            msg: "success updated category...!",
            data: updatedData
        });
        
    } catch (error) {

        res.json({ 
            msg: "failed updated category...!",
            error: error
        });
    }
}

//1639920525710-camp.jpg
export const deleteCategory = async (req, res) => {

    try {

        const categoryId = req.params.id;

        let imgCategory = await Category.findByPk(categoryId,{
            attributes: ['foto']
        });

        if(imgCategory.foto){
            const __dirname = path.resolve();
            await unlink(path.join(__dirname, 'assets/category/'+imgCategory.foto));
        }

        await Category.destroy({
            where: {
            id: categoryId
            }
        });
        
        res.json({ msg: "delete category, success...!!!" });
        
    } catch (error) {
        res.json({ msg: "delete category, failed...!!!", error:error });
    }

}