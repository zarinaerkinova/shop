const { Router } = require('express')
const router = Router()
const constructor = require('../constructor/card')

router.get('/', constructor.getCard)

router.post('/buy', constructor.buy)

router.delete('/delete/:id', constructor.remove)

module.exports = router