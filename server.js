const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const rimraf = require('rimraf')
const bcrypt  = require('bcrypt');
const app = express();
const port = process.env.PORT || 5000;
//Open and load database into object
let db = new sqlite.Database('./client/src/database.db', (err) =>{
    if (err){
        throw err;
            }
    else{
        console.log("Connected to database");
    }
});
require('./database.js')(app, db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { exec } = require("child_process");
function runCmd(cmd,callback) {
   exec(cmd, (error, stdout, stderr) => {
      if (error != null) {
         console.log(`error: ${error.message}`);
         if (callback) {
            return callback("","Something went wrong.");
         }
      }
      if (stderr) {
         if(callback) {
            return callback("\`\`\`"+stderr+"\n"+stdout+"\`\`\`");
         }
      }
      //console.log(stdout);
      if (callback) {
          //console.log("Callback stdout");
      return callback(stdout);
      }
   });
}
//Register a user. If username already exists, return "Failure"
app.post('/api/register', (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;


    //Hash Password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            let sql = 'INSERT INTO User(first_name, last_name, username, password) VALUES (?,?,?,?)';
            let params = ['Johnny', 'Test', username, hash];
            //Create user via script, then insert them into the database
            runCmd("./backend/create_user.sh " + req.body.username, function(text,err) {
                if(text !== "Failure"){
                    db.run(sql, params, (err) => {
                        if(err){
                            console.log(err);
                            rimraf("./users/" + username);
                            res.send("DB Failure");
                        }else{
                            console.log("User creation succecssful: " + username);
                            res.send(text);
                        }
                    });
                }else{
                    res.send(text);
                }
            });
        });
    });
});

//Login checking via hash. TODO: give session cookie
app.post('/api/login', (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
    let sql = 'SELECT * FROM User WHERE username = ?';

    db.get(sql, [username], (err,row) => {
        //console.log("Before hash");
    //    console.log(err);
        console.log(row);
        //If the query is successful, compare the hash and return result
        if(!err && row != undefined){
            console.log("In true block");
            let hash = row.password;
            console.log(password);
            bcrypt.compare(password, hash, (err, result) => {
                console.log("bcrypt = " + result);
                console.log(typeof(result));
                if(result == true){
                    console.log("Succesful Login");
                    res.send("Success");
                }else{
                    console.log(err);
                    res.send("Failure");
                }
            });
        }else{
            res.send("Failure");
        }
    });
});
//---------------------------------------------------------------  Grading api calls below here ----------------------------------------------------

app.get('/api/connect', (req, res) => {
  res.send({ express: 'Connected to the grading server' });
});

app.post('/api/grade', (req, res) => {
    console.log("body "+req.body.code+" "+req.body.lesson);
    console.log(req.body);
    var response;
    //var rand = Math.floor((Math.random() * 10000) + 1);
//right now it is hard coded for saving to user id 6969. this can be changed
    runCmd("printf \""+req.body.code+"\" > ./users/6969/pcode/"+req.body.lesson+" && ./backend/run_python_script.sh ./grading_scripts/"+req.body.lesson+" ./users/6969/pcode/"+req.body.lesson+" "+"6969" +" && rm ./users/6969/pcode/"+req.body.lesson,function(text,error) {
  console.log(text);

  res.send(
   `I received your POST request. This is what you sent me: ` + text,
 );
});

});

app.listen(port, () => console.log(`Listening on port ${port}`));
