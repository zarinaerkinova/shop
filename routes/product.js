const { Router } = require('express')
const router = Router()
const constructor = require('../constructor/product')
const index = require('../constructor/index')

router.get('/', index.getIndex)

router.get('/products', constructor.getProducts)

router.get('/find/:id', constructor.findProducts)

router.post('/add', constructor.setProducts)

router.put('/update/:id', constructor.updateProducts)

router.delete('/delete/:id', constructor.deleteProducts)

module.exports = router