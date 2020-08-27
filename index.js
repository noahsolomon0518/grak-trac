
const express = require('express')
const exhb = require('express-handlebars')
const path = require('path')
const app = express();
const main = require('./routes/main.js')
const account = require('./routes/account.js')
const myPage = require('./routes/my-page.js')

const bodyParser = require('body-parser')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.raw())
app.use(express.text())
app.use('/', main)
app.use('/my-page', myPage)


app.engine('handlebars', exhb({defaultLayout: 'main'}))
app.set('views', './views')
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.listen(5000);