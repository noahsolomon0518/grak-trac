const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const axios = require('axios');

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


router.post('/todos-by-username', (req,res)=>{
    console.log('username', req.body.username)

    let con = getCon()
    let sql = `select todos.todoId, section, task, status, user.userId, dateCreated, date(dateCreated) as date, username from todos 
    JOIN user on user.userId = todos.userId
    WHERE todos.dateCreated in (SELECT DISTINCT(dateCreated) as uniqueDates from todos ORDER BY uniqueDates DESC)
    AND user.username = 'nsolomon'
    ORDER BY dateCreated DESC
    `
    con.connect(()=>{
        con.query(sql, (err,result)=>{
            if (err) throw err;
            let resultJSON = JSON.parse(JSON.stringify(result))
            res.json(parseData(resultJSON))
            con.end()

        })
    })
})



router.get('/', (req,res)=>{
    if(req.session.username == undefined){
        res.redirect('/login')
    }else{
        axios.post('http://localhost:5000/my-page/todos-by-username',{username:'nsolomon'})
        .then(result=>{
            console.log('Hello')
            res.render('my-page', {username:req.session.username})
        }).catch(err=>{
            console.log(err)
        })
        
    }
    
    
    if(req.headers.username == 'nsolomon' && req.headers.password == 'Go@tee123'){req.}
        

})


function parseData(data){
    let uniqueDates = []
    let parsedData = []
    for(let todoRow of data){
        if(!uniqueDates.includes(todoRow.date)){
            uniqueDates.push(todoRow.date)
            parsedData.push([todoRow])
        }else{
            let ind = uniqueDates.indexOf(todoRow.date)
            parsedData[ind].push(todoRow)
        }
    }
    return parsedData
}







module.exports = router