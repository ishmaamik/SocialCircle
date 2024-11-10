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

const __fileName= fileURLToPath(import.meta.url);  
const __dirName= path.dirname(__fileName);
const app= express();

app.use(helmetConfig);  //don't use helmetConfig() rather helmetConfig only since helmet() is already configured and initialized in helmet.js.
app.use(morgan("common"));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));    //bodyParser is deprecated middleware
app.use(cors());

console.log(__fileName);
console.log(__dirName);

