const Card = require('../model/card')

module.exports.getCard = async function (req, res) {
    const card = await Card.get()
    res.render('cards', {
        card: card
    })
}

module.exports.buy = async function (req, res) {
    const productId = +req.body.productId
    await Card.buy(productId)
    res.status(200).send('Bought successfull')
}

module.exports.remove = async function (req, res) {
    const card = req.params.id
    const response = await Card.remove(card)

    res.status(201).send(response)
}