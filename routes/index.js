const { Router } = require('express')
const router = Router()
const constructor = require('../constructor/category')

router.get('/', constructor.getIndex)


module.exports = router