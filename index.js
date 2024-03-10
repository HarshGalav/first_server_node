const express = require('express');

const {logReqRes} =require("./middlewares")
const {connectMongoDb}=require("./connection");
const userRouter =require("./routes/user");

const app = express()
const port = 8000
connectMongoDb("mongodb://127.0.0.1:27017/projectdb-01").then(()=>console.log("Mongodb Started!!!"));

app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));
app.use("/api/users",userRouter);
app.listen(port, () => console.log(`server started on port ${port}!`))