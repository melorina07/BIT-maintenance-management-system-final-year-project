const express = require("express");
const app = require("./app");

const connectDatabase = require ("./db/Database.js");
connectDatabase();

const dotenv = require("dotenv");
dotenv.config({
    path:"config/.env"
})

const server = app.listen(process.env.PORT,() =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});
