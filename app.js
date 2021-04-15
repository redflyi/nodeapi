const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
dotenv.config();


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true}).then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection Error: ${err.message}`);
});


const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// const myOwnMiddleWare = (req, res, next) => {
//     console.log("middleware applied!!");
// next();
// };

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
// app.use(myOwnMiddleWare);
app.use("/", postRoutes);
app.use("/", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});