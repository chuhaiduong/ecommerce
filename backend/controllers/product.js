import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {      
        if (err) {
            res.status(400).json({
                error: "Thêm sản phẩm không thành công!"
            })
        }
        const { name, describe, price} = fields;
        if (!name || !describe || !price ) {
            res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin "
            })
        }

        let product = new Product(fields);
        // console.log('feeee',fields)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 10mb"
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }

        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không thể thêm được sản phẩm"
                })
            }
            // data.photo = undefined;
            res.json(data)
        })

    })
}
export const productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            res.status(400).json({
                error:"Không tìm thấy sản phẩm"
            })
        }
        req.product = product;
        next();
    })
}

export const read =(req,res)=>{
    return res.json(req.product);
}

export const remove = (req, res) => {
    let product = req.product;
    console.log(product);
    product.remove((err, deleteProduct) => {
        if (err) {
            res.status(400).json({
                error: "Xóa sản phẩm không thành công!"
            })
        }
        res.json({
            deleteProduct,
            message: "Xóa thành công!"
        })
    })
}
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            message: "Không tìm thấy sản phẩm"
        }
        res.json( data )
    })
}
export const update = (req,res) =>{  
    let form = new formidable.IncomingForm();
    console.log('abc');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {      
        if (err) {
            res.status(400).json({
                error: "Sửa sản phẩm không thành công!"
            })
        }
        const { name, describe, price} = fields;
        if (!name || !describe || !price ) {
            res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin "
            })
        }

        // let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product,fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 10mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }

        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không thể sua được sản phẩm"
                })
            }
            // data.photo = undefined;
            res.json(data)
        })

    });
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}