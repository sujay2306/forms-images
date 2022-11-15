const express = require("express");

const app = express();

app.set('view engine', 'ejs') //set the middleware

// middlewares tells to accept json data 
app.use(express.json());

//for handling url extended form 
app.use(express.urlencoded({extended: true}));

app.get("/myget", (req, res) => { 
    console.log(req.body);

    res.send(req.body)
})

app.get("/getform", (req, res) => {
    res.render('getform')
})
app.listen(4000, () => {
    console.log("running server at 4000");
})

