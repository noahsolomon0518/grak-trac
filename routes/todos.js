const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const axios = require('axios');
const { group } = require('console');

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
    let username = req.body.username
    let friends = req.body.friends
    console.log('username is: ', req.body.username)
    console.log('friends are: ', req.body.friends)
    let todosToShow = friends
    todosToShow.push(username)
    todosToShow = '\''+todosToShow.join('\',\'')+'\''

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
            res.json(pullOutUser(groupByDates(resultJSON),username))
            con.end()

        })
    })
})



router.get('/', (req,res)=>{
    if(req.session.username == undefined){
        res.redirect('/login')
    }else{
        axios.post('http://localhost:5000/todos/todos-by-username-today',{username:req.session.username,friends:['msol']})
        .then(result=>{
            let myTodos = result.data['todosWithUser']
            let friendsTodos = result.data['todosWithoutUser']

            let username = req.session.username
            res.render('todos', {username:username, myTodos:myTodos, friendsTodos:friendsTodos})
        }).catch(err=>{   
            console.log(err)
        })
        
    }
    
    
    
        

})



function groupByDates(data){
    let uniqueUsers = []
    let parsedData = []
    for(let todoRow of data){
        if(!uniqueUsers.includes(todoRow.username)){
            uniqueUsers.push(todoRow.username)
            parsedData.push([todoRow])
        }else{
            let ind = uniqueUsers.indexOf(todoRow.username)
            parsedData[ind].push(todoRow)
        }
    }
    return parsedData
}


function pullOutUser(data, username){
    let todosWithoutUser = []
    let todosWithUser = []
    for(let userTodos of data){
        if(userTodos[0].username == username){
            todosWithUser= userTodos
        }else{
            todosWithoutUser.push(userTodos)
        }
    }
    return {
        todosWithoutUser:todosWithoutUser,
        todosWithUser:todosWithUser
    }
}






module.exports = router