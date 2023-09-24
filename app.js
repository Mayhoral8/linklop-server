const express = require('express')
const app = express()
const {config} = require('dotenv')
config()
const mongoose = require('mongoose')
const {shLink, getLink} = require('./controllers/shorten')
const name = process.env.DB_USER
const password = process.env.DB_PASSWORD



mongoose.connect(
    `mongodb+srv://${name}:${password}@cluster0.xoq86dz.mongodb.net/?retryWrites=true&w=majority`
).then(()=>{
    console.log('connected to database!')
}).catch(()=>{
    console.log('connection failed!')
})
app.use(express.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    next();
    })
app.post('/api/shorten', shLink)
app.get('/:link', getLink)
// app.get('/')
// app.use('/api/link')


app.listen(8000, ()=>{
console.log('listening on port 8000');
})


