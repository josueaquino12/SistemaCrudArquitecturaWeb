const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const cors = require('cors');


//midleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//routes
app.use(require('./router/route'));


app.listen(3001, () =>{
    console.log("running on port 3001")
})