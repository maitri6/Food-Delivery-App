const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');



const app = express();
app.use(express.json());



app.use(session({
    secret: 'mySecretKey', // Replace with your own secret key
    resave: true,
    saveUninitialized: true,
    cookie: {
        //maxAge: 600000,
        secure: false,
        signed: true

    }
}));



const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const indexRouter = require("./routes/index");

//mongoose connection
//mongoose.connect("mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo-db:27017/node", {
mongoose.connect("mongodb+srv://CMS:bk9828064545@cluster0.itloa.mongodb.net/Food-Delivery?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api/v1", indexRouter);
const dbConn = mongoose.connection;
dbConn.on("error", () => {
    console.log("Mongodb connection error");
});

dbConn.once("open", function () {
    console.log("Mongodb connected successfully!!");
});

app.get('/', function (req, res) {
    res.send("Food Delivery App Runs!!")
});

server.listen(2000, function () {
    console.log("Server is running at 2000");
})