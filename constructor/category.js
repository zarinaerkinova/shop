const Category = require('../model/category')

module.exports.getCategory = async function (req, res) {
    const category = await Category.find()
    res.render('categories', {
        category: category
    })
}

module.exports.setCategory = async function (req, res) {
    const categories = req.body
    await Category.save(categories)

    res.status(201).send('Successfull')
}

module.exports.categoryFindById = async function (req, res) {
    const id = req.params.id
    
    const categoryProducts = await Category.findById(id)

    res.status(200).send(categoryProducts)
}

module.exports.updateCategory = async function (req, res) {
    const body = req.body
    const id = req.params.id
    const response = await Category.updateById(body, id)
    res.send(response)
}

module.exports.deleteCategory = async function (req, res) {
    const categories = req.params.id
    const response = await Category.deleteById(categories)
    res.send(response)
}