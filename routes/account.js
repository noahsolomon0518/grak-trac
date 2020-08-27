const express = require('express')
const router = express.Router()
const mysql = require('mysql')

function getCon(){
    var con = mysql.createConnection({

        host: "noahswebserver.com",
        port: 3306,
        user: "noahsweb_todoApp",
        password: "Go@tee123",
        database: 'noahsweb_todoApp'
      });  
    return con 
}




router.post('/login-validation', (req,res)=>{
    let con = getCon()
    let username = req.body.username
    let password = req.body.password
    var validated = false
    con.connect(function(){
        const sql = `select * from user WHERE username = '${username}' AND password = '${password}'`
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result[0]!=undefined){
                validated = true
            }    
            req.session.username = username
            res.send(validated)
            con.end()
        });    
    })     
})    



router.post('/registration-validation', (req,res)=>{
    let con = getCon()
    let username = req.body.username
    let password = req.body.password
    var validated = true
    con.connect(function(){
        let sql = `select * from user WHERE username = '${username}'`
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result[0]!=undefined){
                validated = false
            }    
            if(validated){
                sql = `insert into user(username,password) values('${username}','${password}')`
                con.query(sql)
                console.log('this should be first')
                res.send(true)
                con.end()

            }else{
                res.send(false)
                con.end()
            }    
        });    

    })     
})    




module.exports = router