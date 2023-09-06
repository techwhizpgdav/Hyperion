const express = require('express');
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');
const path = require('path')
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// Engine Handler 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Router Importing
const apiRouter = require('./routes/userlogin');
const Hyperion = require('./routes/hyperionRouter');
const galleryROuter = require('./routes/galleryROuter'); 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Router Using
app.use('/api',apiRouter);
app.use('/',express.static(path.join(__dirname,'static')))
app.use('/gallery',express.static(path.join(__dirname,'static')))
app.use('/gallery/:galName',express.static(path.join(__dirname,'static')))
app.use('/gallery',galleryROuter);
app.use('/',Hyperion);
app.use('/:socName',express.static(path.join(__dirname,'static')));




app.listen(port,(req,res)=>{
    console.log(`App listening on  ${port}`);
})