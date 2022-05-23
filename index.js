var express = require('express')
var app = express()
var mysql = require('mysql')
const {response} = require("express");

//app.use(express.static('public'))
app.get('/', function (req, res) {
    fetchData(res);
    console.log('Done!')
});


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "voting"
});

con.connect(function (err){
    if(err){ throw err;}
    console.log("connected to the db!");
})

function executeQuery(sql, cb){
    con.query(sql, function (error, result, fields){
        if(error) {throw error;}
        cb(result);
    })
}

function fetchData(res){
    executeQuery("SELECT * FROM haaletus", function (result){
        console.log(result);
        res.write(`<h1>Voting</h1>`);
        res.write(`<button>pool</button>`)
        res.write(`<table style="width: 50%"><tr>`);
        for(var column in result[0]){
            res.write(`<th>` + column +  `</th>`);
        }
            res.write(`</tr>`);

        for(var row in result){
            res.write(`<tr>`);
            for (var column in result[row]) {
                res.write(`<td><label>` + result[row][column] +  `</label></td>`);
            }
                res.write(`</tr>`);
        }
        res.end(`</table>`);

    });

    //res.write(`<button onclick="myFunk()" id="but">ok</button>`);
}


app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});













