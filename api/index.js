import express from "express"

const app= express();
const PORT= 3000;

app.listen(PORT, (req, res)=>{
    console.log(`Running on port ${PORT}`)
})

app.get('/', (req,res)=>{
    res.send('Hi there!')
})