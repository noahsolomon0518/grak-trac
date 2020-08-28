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


router.post('/todos-by-username-today', (req,res)=>{
    
    console.log('username is: ', req.body.username)
    console.log('friends are: ', req.body.friends)
    let todosToShow = req.body.friends
    todosToShow.push(req.body.username)
    todosToShow = '\''+todosToShow.join('\',\'')+'\''
    console.log(todosToShow)

    let con = getCon()
    let sql = `select todos.todoId, section, task, status, user.userId, dateCreated, date(dateCreated) as date, username from todos 
    JOIN user on user.userId = todos.userId
    WHERE todos.dateCreated in (SELECT DISTINCT(dateCreated) as uniqueDates from todos ORDER BY uniqueDates DESC)
    AND user.username in (${todosToShow})
    AND date(dateCreated) = CURDATE()
    ORDER BY dateCreated DESC
    `
    con.connect(()=>{
        con.query(sql, (err,result)=>{
            if (err) throw err;
            let resultJSON = JSON.parse(JSON.stringify(result))
            res.json(resultJSON)
            con.end()

        })
    })
})



router.get('/', (req,res)=>{
    if(req.session.username == undefined){
        res.redirect('/login')
    }else{
        axios.post('http://localhost:5000/my-page/todos-by-username-todo',{username:req.session.username,friends:[]})
        .then(result=>{
            console.log('Hello')
            res.render('my-page', {username:req.session.username, todoData:result.data})
        }).catch(err=>{
            console.log(err)
        })
        
    }
    
    
    
        

})







module.exports = router