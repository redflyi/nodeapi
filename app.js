const express = require('express');
const morgan = require('morgan');

const app = express();

const postRoutes = require("./routes/post");


// const myOwnMiddleWare = (req, res, next) => {
//     console.log("middleware applied!!");
// next();
// };

app.use(morgan('dev'));

// app.use(myOwnMiddleWare);


app.use("/", postRoutes);

const port = 8080;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});