const express = require('express')
const app = express()
const { create } = require('express-handlebars')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const port = normalizePort(process.env.PORT || 3000)

// Import routes 
const indexRouter = require('./routes/product')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const cardRouter = require('./routes/card')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('port', port)

// Routing 
app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/categories', categoryRouter)
app.use('/card', cardRouter)

try {
    app.listen(port, () => {
        console.log('Server working on port ', app.get('port'));
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}