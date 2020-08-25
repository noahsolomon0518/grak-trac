const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const axios = require('axios')


router.get('/login', (req,res)=>{
    res.render('login')
})




router.get('/register', (req,res)=>{
    res.render('register')
})


router.get('/my-page/:user', (req,res)=>{
    console.log(req.params)
    res.render('my-page')
})



module.exports =  router