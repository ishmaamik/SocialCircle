import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmetConfig from "./middlewares/helmet.js";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { register } from "./controllers/auth.js";

dotenv.config();    //A must NEED

const username= process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;
const __fileName= fileURLToPath(import.meta.url);  
const __dirName= path.dirname(__fileName);
const app= express();
const PORT= 8000;
const URL = `mongodb+srv://${username}:${password}@cluster0.zc15p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './uploads');    //null means no error handling and destination upload to ./uploads
    },

    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);    //returns the unique filename which has appended to date time
    }
})

const upload= multer({storage: storage});


app.use(helmetConfig);  //don't use helmetConfig() rather helmetConfig only since helmet() is already configured and initialized in helmet.js.
app.use(morgan("common"));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));    //bodyParser is deprecated middleware
app.use(cors());
app.listen(PORT, ()=>console.log(`App listening on ${PORT}`));

app.post('/uploads', upload.single('profileImage'), (req, res)=>{
        console.log(req.body);
        console.log(req.file);

        return res.redirect("/");
})

const connection=async()=>{
    try {
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
};

 connection();

app.post('/register', upload.single("profileImage"), register);

app.use('/',(req, res)=>{
    const htmlFile= path.join(__dirName, 'frontend.html');
    res.sendFile(htmlFile);
})
console.log(__fileName);
console.log(__dirName);

