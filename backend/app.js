const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const bodyParser = require("body-parser");
// const path = require("path");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(fileUpload({useTempFiles: true}));

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })}

// Route imports
const user = require("./routes/UserRoute");
const request = require("./routes/RequestRoute");
const Faculty = require("./routes/FacultyRoute");
const Department = require("./routes/DepartmentRoutes");
const register = require("./routes/AdminRoute");

app.use("/api/v2", user);
app.use("/api/v2", request);
app.use("/api/v2", Faculty);
app.use("/api/v2", Department);
app.use("/api/v2", register);


// app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app