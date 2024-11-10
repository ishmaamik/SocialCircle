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

const __fileName= fileURLToPath(import.meta.url);  
const __dirName= path.dirname(__fileName);
const app= express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false, 
        directives:{
            defaultSrc: ["'self'"], 
            scriptSrc: ["'self'", "'www.example.com'"],
            objectSrc: ["'none'"], 
            upgradeInsecureRequests: [], 
        },
    },
    crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups'
    },
    crossOriginResourcePolicy: {
        policy: 'same-origin'
    }, 
    referrerPolicy: {
        policy: ['origin', 'no-referrer-when-downgrade', 'strict-origin-when-cross-origin']
    },
    strictTransportSecurity:{
        maxAge: 15552000   
    }
}))

console.log(__fileName);
console.log(__dirName);

