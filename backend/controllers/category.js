import Category from '../models/category';
// import { errorHandler } from '../helpers/dbErrorsHandler';

export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Khong them duoc danh muc"
            })
        }
        res.json({ data });
    });
}
export const list = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(400).json({
                error:"danh muc khong ton tai"
            })
        }
        res.json({ categories });
    })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: 'Khong tim thay danh muc'
            })
        }
        req.category = category;
        console.log(req.category);
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedCategory,
            message: "Khong xoa duoc danh muc"
        });
    })
}
export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Khong cap nhat duoc danh muc"
            })
        }
        res.json({ data });
    });
}