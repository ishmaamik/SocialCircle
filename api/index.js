import express from "express"
import { connect } from "./middlewares/mongo.js";
import { addUser } from "./controllers/userController.js";
import cors from "cors";

const app= express();
app.use(cors({
    origin: "http://localhost:5173",  // Allow only localhost:3000 to make requests
    methods: "GET,POST",              // Specify allowed HTTP methods
    allowedHeaders: "Content-Type",   // Allow 'Content-Type' header
}));
const PORT= 3000;

app.listen(PORT, (req, res)=>{
    console.log(`Running on port ${PORT}`)
})

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hi there!')
})

app.post('/user', addUser)
connect();