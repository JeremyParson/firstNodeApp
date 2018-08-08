let data;   //variable to store data in
var mysql      = require('mysql');  //imports mysql package
var connection = mysql.createConnection({   //creates a connection instance to database
  host     : '10.67.71.7',
  user     : 'root',
  password : '98835Piggy98835!',
  database : 'students'
});

connection.connect();   //connects to database

connection.query('SELECT * FROM student', function (error, results, fields) {   //querys database for information
  if (error) throw error   //check if there is an error, if so it will throw it
  data = results   //sets sata equal to the output of the query
});

connection.end();   //ends connection to database

const express = require('express')  //gets express package
const bodyParser = require('body-parser')   //gets body-parser package
const path = require('path')    //gets path package
const app = express()   //initializes app with MAGIC
const expressvalidator = require('express-validator');  //gets expressvalidator package

// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// }

//body parser middleware
app.use(bodyParser.json()); //Tells the app to use this middleware
app.use(bodyParser.urlencoded({extended: false}))   //Tells the app to use this middleware
app.use(expressvalidator)   //Tells the app to use this middleware

app.use(express.static(path.join(__dirname, 'lib')))    //Tells the app to use a specific resouce folder

//view engine
app.set('view engine', 'ejs'); //DONT KNOW WHAT THIS DOES
app.set('views', path.join(__dirname, 'lib')) //DONT KNOW WHAT THIS DOES


app.get('/', (req, res) => {    //This is essentialy an event listener for a server, When it recieves a request for a specific path on the server this will execute whatever in the callback function
    let userData = data;
    res.render('index', {
        title: "My App",
        userData: userData
    })
    console.log("server is up!");
})

app.post('/users/add', (req, res) => {
    console.log(`form submited ${req.body.first_name}`);
    const newUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        street : req.body.Street,
        city : req.body.City,
        state : req.body.State,
        zip : req.body.Zip,
        phone : req.body.Phone,
        birth_date : req.body.birth_date,
        sex : req.body.Sex,
        date_entered : "NOW()",
        lunch_cost : req.body.Lunch_cost,
        Student_id : "NULL"
    }

    console.log(`A new form has been submitted! ${newUser}`);
    res.render(formsubmitted,{
        first_name : newUser.first_name
    })
})



app.get('/homepage', (req, res) => res.send(data))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
