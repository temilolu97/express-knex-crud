const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./db/knexfile')
require('dotenv').config()
//initialize knex
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users',(req,res)=>{
  knex('users').select({
    id:'id',
    firstName:'firstName',
    lastName:'lastName',
    email:'email'
  }).then((users)=>{
    return res.json(users)
  }).catch((err)=>{
    console.error(err)
    return res.json({success:false,message:"An error occurred, please try again later"})
  })
})

app.post('/users',(req,res)=>{
  const {firstName, lastName, email, password} = req.body
  knex('users').insert({
    firstName,lastName,email,password
  }).then((id) => {
    //get user by id
    knex('users')
        .select({
        id: 'id',
        firstName:'firstName',
        lastName:'lastName',
        email:'email'
    })
        .where({id})
        .then((user) => {
        return res.json(user[0]);
    })
  })
  .catch(err=>{
    console.error(err)
    return res.json({success:false,message:"An error occurred, please try again later"})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});