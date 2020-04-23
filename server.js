const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const rimraf = require('rimraf')
const bcrypt  = require('bcrypt');
const app = express();
const port = process.env.PORT || 5000;
const secret = "this is temporary";
const jwt = require('jsonwebtoken');

//Open and load database into object
let db = new sqlite.Database('./client/src/database.db', (err) =>{
    if (err){
        throw err;
            }
    else{
        console.log("Connected to database");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { exec } = require("child_process");
function runCmd(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error != null) {
            console.log(`error: ${error.message}`);
            if (callback) {
                return callback("", "Something went wrong.");
            }
        }
        if (stderr) {
            if (callback) {
                return callback("\`\`\`" + stderr + "\n" + stdout + "\`\`\`");
            }
        }
        // console.log(stdout);
        if (callback) {
            //console.log("Callback stdout");
            return callback(stdout);
        }
    });
}

//Register a user. If username already exists, return "Failure"
app.post('/api/register', (req, res,next) => {
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
                    //Add user to the database
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

//Login checking via hash.
app.post('/api/login', (req, res, next) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
    let sql = 'SELECT * FROM User WHERE username = ?';

    db.get(sql, [username], (err,row) => {
        console.log(row);
        //If the query is successful, compare the hash and return result
        if(!err && row != undefined){
            let hash = row.password;
            bcrypt.compare(password, hash, (err, result) => {
                if(result === true){
                    //Sign a token with username as payload
                    var token = jwt.sign({username: username, teacher: false}, secret, {
                        expiresIn: 86400    //Expires in 24 hours
                    });
                    console.log("True token: " + token);
                    res.json({
                        "message": "Success",
                        "token": token
                    });
                }else{
                    //console.log("Login fail" + err);
                    res.json({
                        "message": "Failure"
                    });
                }
            });
        }else{
            res.json({"message": "Failure"});
        }
    });
});

//---------------------------------------------------------------  Grading api calls below here ----------------------------------------------------
app.get('/api/connect', (req, res, next) => {
    res.send({ express: 'Connected to the grading server' });
});

app.post('/api/grade', (req, res) => {
    console.log("body "+req.body.code+" "+req.body.lesson);
    console.log(req.body);
    var response;
    //var rand = Math.floor((Math.random() * 10000) + 1);
//right now it is hard coded for saving to user id 6969. this can be changed
    runCmd("printf \"" + req.body.code + "\" > ./users/6969/pcode/" + req.body.lesson + " && ./backend/run_python_script.sh ./grading_scripts/" + req.body.lesson + " ./users/6969/pcode/" + req.body.lesson + " " + "6969" + " && rm ./users/6969/pcode/" + req.body.lesson, function (text, error) {
        console.log(text);

        res.send(
            `I received your POST request. This is what you sent me: ` + text,
        );
    });

});

// const DBSOURCE = "./client/src/database.db";

module.exports = (app, db) =>{


/************** Lesson Requests ****************/
    //GET all Lessons
    app.get('/api/Lesson/all', (req,res) => {
        let sql = 'SELECT * FROM Lesson  ';
        let params = [];
        db.all(sql, params, (err, rows) =>{
            if (err){
                res.status(400).json({
                    "error": err.message,
                    "message": "Failure"
                });
                return;
            }
            res.json({
                message: "Success",
                data: rows
            });
        });
    });

    //GET single Lesson
    app.get('/api/Lesson/:id', (req, res) => {
        let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
        let lessonNum = [req.params.id];

        //get query to database for lesson with :id
        db.get(sql, lessonNum, (err, row) => {
            if (err){
                res.status(400).json({
                    "error" : err.message,
                    "message" : "Failure"});
                return;
            }
            res.json({
                message: "Success",
                data: row});
        });
    });

    // // Make a new lesson
    // app.post('/NewLesson', (req, res) => {
    //     // let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
    //     let sql = 'INSERT INTO Lesson(lesson_id, question, answer, name, hint) VALUES (?,?,?,?,?)';
    //     // TODO add lesson number
    //     // TODO add group by lesson_number ascending

    //     let lessonID = 100;
    //     let lessonName = [req.params.name];
    //     let lessonQuestion = [req.params.question];
    //     let lessonHint = [req.params.hint];

    //     let values = [lessonID, lessonName, lessonQuestion, lessonHint]

    //     //get query to database for lesson with :id
    //     db.get(sql, values, (err, row) => {
    //         if (err){
    //             res.status(400).json({
    //                 "error" : err.message,
    //                 "message" : "Failure"});
    //             return;
    //         }
    //         res.json({
    //             message: "Success",
    //             data: row
    //         });
    //     });
    // });

/****************** User Requests *****************/

    app.get('/User/:userid', (req,res) => {
        let sql = 'SELECT * FROM User WHERE user_id = ?';

        db.get(sql, req.params.userid, (err,row) => {
            if(err){
                res.status(400).json({
                    "error": err.message,
                    "message" : "Failure"})
                    return;
            }
            res.json({
                message: "Success",
                data: row});
        });
    });
    //Only time we need to close database is on SIGINT
//    process.on('SIGINT', () =>{
//        db.close();
//    });
};

app.listen(port, () => console.log(`Listening on port ${port}`));