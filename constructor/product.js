const Product = require('../model/product')

module.exports.getProducts = async function (req, res) {
    const products = await Product.find()
    res.render('product', {
        products: products
    })
}

module.exports.setProducts = async function (req, res) {
    const products = req.body
    await Product.save(products)

    res.status(201).send('Successfull')
}

module.exports.findProducts = async function (req, res) {
    const products = req.params.id
    const product = await Product.findById(products)
    res.render('product', {
        product: product
    })
}

module.exports.updateProducts = async function (req, res) {
    const body = req.body
    const id = req.params.id
    const response = await Product.updateById(body, id)
    res.send(response)
}

module.exports.deleteProducts = async function (req, res) {
    const products = req.params.id
    const response = await Product.deleteById(products)
    res.send(response)
}