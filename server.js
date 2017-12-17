//routing framework
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var path = require('path');
//adding body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//auth service
let authService = require('./auth.service');

//db connection
let mongoUtil = require('./mongo.util');
mongoUtil.connectToMongoDB()
    .then(result => {

        console.log("DB connection setup!");
    })
    .catch(err => {

        console.log("DB connection failed!");
    })


app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {

    res.status(200).send("Hi the is your jan dataServer");
})


app.post('/login', (req, res) => {

    mongoUtil.login(req.body.username, req.body.password)
        .then(result => {

            res.status(200).send({
                message: "Login successful",
                JWT: authService.createToken(req.body.username),
            })
        })
        .catch(err => {
            res.status(400).send({
                message: "Wrong username or password!"
            })
        })

})


app.post('/getByQuery', authService.verifyJWT, (req, res) => {

    mongoUtil.getLike(req.body.colName, req.body.colValue)
        .then(result => {
            return res.status(200).send(result);
        })
        .catch(err => {
            return res.end(err);
        })

})

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("the server is up on 3000");
})










//shared

// var fs = require('fs');
// console.log(__dirname);
// const csvFilePath=__dirname+'\\Ersama_DB.csv';
// console.log(csvFilePath);
// const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .on('json',(jsonObj)=>{
//     fs.appendFileSync('./Ersama_DB.json', JSON.stringify(jsonObj));
//     // combine csv header row and csv line to a json object
//     // jsonObj.a ==> 1 or 4
// })
// .on('done',(error)=>{
//     console.log('end')
// })

