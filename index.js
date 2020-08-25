
const express = require('express')
const exhb = require('express-handlebars')
const path = require('path')
const app = express();
const content = require('./routes/content.js')
const dbquery = require('./routes/dbquery.js')
const bodyParser = require('body-parser')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.raw())
app.use(express.text())
app.use('/content', content)
app.use('/dbquery', dbquery)


app.engine('handlebars', exhb({defaultLayout: 'main'}))
app.set('views', './views')
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.listen(5000);