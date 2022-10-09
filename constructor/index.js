const Category = require('../model/category')

module.exports.getIndex = async function (req, res) {
    res.render('layouts/layout')
}
