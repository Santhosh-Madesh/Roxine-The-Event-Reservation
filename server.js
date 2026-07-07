const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const corsOptions = {
    origin : "http://localhost:5173",
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-Type', 'Authorization'],
    credentials : true,
    optionsSuccessStatus : 200
}

app.use(cors(corsOptions))

const connectDB = require("./db/connectDB");

const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

app.use(express.json());

connectDB();

const errorHandler = require("./middlewares/errorMiddleware");

app.use(errorHandler);

const userRouter = require("./routes/userRoutes");
const eventOrganiserRouter = require("./routes/eventOrganiserRoutes");
const userEventRouter = require("./routes/userEventRoutes");
const organisationRouter = require("./routes/organisationRoutes");


app.get("/health", (req, res)=>{
    res.json({
        success: true,
        message : "Server is healthy"
    })
} )

app.use("/user", userRouter);
app.use("/organiser", eventOrganiserRouter);
app.use("/event", userEventRouter);
app.use("/organisation", organisationRouter);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Roxine Server is Up & Running")
} )