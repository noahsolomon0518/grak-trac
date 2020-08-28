
const express = require('express')
const exhb = require('express-handlebars')
const session = require('express-session')
const app = express();
const main = require('./routes/main.js')
const account = require('./routes/account.js')
const myPage = require('./routes/my-page.js');

app.use(session({secret:'secret', saveUninitialized:true , resave:true}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.raw())
app.use(express.text())

/*
*/

app.use('/', main)
app.use('/my-page', myPage)
app.use('/account', account)


app.engine('handlebars', exhb({defaultLayout: 'main'}))
app.set('views', './views')
app.set('view engine', 'handlebars');
app.use(express.static('public'))

let server = app.listen(5000);


module.exports = server