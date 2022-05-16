var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "voting"
});

con.connect(function (err){
    if(err) throw err;
    console.log("Connected!");
});
module.exports = con;