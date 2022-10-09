const { Router } = require('express')
const router = Router()
const constructor = require('../constructor/category')

router.get('/category', constructor.getCategory)

router.post('/add', constructor.setCategory)

router.get('/:id', constructor.categoryFindById)

router.put('/update/:id', constructor.updateCategory)

router.delete('/delete/:id', constructor.deleteCategory)

module.exports = router