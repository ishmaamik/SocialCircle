import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmetConfig from "./middlewares/helmet.js";
import { upload } from "./middlewares/multer.js";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { Connection } from "./middlewares/connect.js";
import postRoutes from "./routes/postRoutes.js";
const __fileName= fileURLToPath(import.meta.url);  
const __dirName= path.dirname(__fileName);
const app= express();
const PORT= 8000;

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

 Connection();

 app.use("/auth", authRoutes);  //order of "/" and "/auth" matters!
 app.use("/user", userRoutes);
 app.use("/post", postRoutes);

 app.use("/",(req, res)=>{
    const htmlFile= path.join(__dirName, 'frontend.html');
    res.sendFile(htmlFile);
})