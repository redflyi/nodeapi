const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');
dotenv.config();


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true}).then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection Error: ${err.message}`);
});


const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { JSONParser } = require('formidable');

app.get('/', (req, res) => {
  fs.readFile('docs/apidocs.json', (err, data) => {
    if(err) {
      res.status(400).json({
        error:err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// const myOwnMiddleWare = (req, res, next) => {
//     console.log("middleware applied!!");
// next();
// };

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
// app.use(myOwnMiddleWare);
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized"});
    }
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});