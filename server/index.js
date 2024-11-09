import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __fileName= fileURLToPath(import.meta.url);   //gets the file name of current file
const __dirName= path.dirname(__fileName);  //
const app= express();

app.use(bodyParser.urlencoded({extended: false}));

console.log(__fileName);
console.log(__dirName);

