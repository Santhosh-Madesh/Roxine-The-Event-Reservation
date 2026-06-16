const express = require("express");

const app = express();

require("dotenv").config();

const connectDB = require("./db/connectDB");

const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

app.use(express.json());

connectDB();

const errorHandler = require("./middlewares/errorMiddleware");

app.use(errorHandler);

const userRouter = require("./routes/userRoutes");
const eventOrganiserRouter = require("./routes/eventOrganiserRoutes");


app.get("/health", (req, res)=>{
    res.json({
        success: true,
        message : "Server is healthy"
    })
} )

app.use("/user", userRouter);
app.use("/organiser", eventOrganiserRouter);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Roxine Server is Up & Running")
} )