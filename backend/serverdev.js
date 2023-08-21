const { default: mongoose } = require("mongoose");
const app =require("./app");


const dotenv = require("dotenv");

    dotenv.config({
        path:"config/.env"

});

const PORT = process.env.PORT;

const CONNECTION= process.env.MONGODB_CONN;
mongoose
.connect(CONNECTION,{useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Listening at port${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));
// const server =  app.listen(process.env.PORT, ()=>{
//     console.log(`server is working on http://localhost:${process.env.PORT}`)
// })