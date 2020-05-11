const { v4: uuidv4 } = require('uuid');
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
    let first_name = body.first_name;
    let last_name = body.last_name;
    let user_type = body.user_type;
    let otp = body.otp;
    let sql = '';

    sql = 'SELECT * FROM User WHERE username = ?'
    db.get(sql, [username], (err,row) => {
        if (row){
            console.log("user already exists: ");
            console.log(row);
            res.json({
                message: "Username exists"
            });
            return;
        }
        else {
            //Hash Password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, password_hash) => {
                    sql = 'INSERT INTO User(first_name, last_name, username, password, is_teacher) VALUES (?,?,?,?,?)';
                    if (user_type === "teacher") {
                        // TODO check otp
                        let params = [first_name, last_name, username, password_hash, true];
                        db.run(sql, params, (err) => {
                            if (err) {
                                console.log(err);
                                res.json({
                                    "message": "DB Failure",
                                });
                            } else {
                                console.log("User creation succecssful: " + username);
                                res.json({
                                    "message": "Success",
                                });
                            }
                        });
                    }
                    else if (user_type === "student") {
                        // TODO set the grades for all existing lessons to 0
                        let params = [first_name, last_name, username, password_hash, false];
                        // Create user via script, then insert them into the database
                        runCmd("./backend/create_user.sh " + username, function (text, err) {
                            if (text !== "Failure") {
                                // Add user to the database
                                db.run(sql, params, (err) => {
                                    if (err) {
                                        console.log(err);
                                        // Remove the new user's directory
                                        rimraf("./users/" + username);
                                        res.json({
                                            "message": "DB failure",
                                            "error": err,
                                        });
                                    } else {
                                        console.log("User creation succecssful: " + username);
                                        res.json({
                                            "message": "Success",
                                        });
                                    }
                                });
                            } else {
                                res.json({
                                    "message": text,
                                });
                            }
                        });
                    }
                });
            });
        }
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
            let password_hash = row.password;
            let is_teacher = row.is_teacher;
            bcrypt.compare(password, password_hash, (err, result) => {
                if(result === true){
                    //Sign a token with username as payload
                    console.log("Is teacher?: " + is_teacher);
                    var token = jwt.sign({username: username, teacher: is_teacher}, secret, {
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
    runCmd("printf '%s' \"" + req.body.code + "\" > ./users/" + req.body.user + "/pcode/" + req.body.lesson + " && ./backend/run_python_script.sh ./grading_scripts/" + req.body.lesson + " ./users/"+req.body.user+"/pcode/" + req.body.lesson + " " + req.body.user, function (text, error) {
        console.log(text);
        if (error) {
            res.send(`Something went wrong`);
        }
        res.send(
            `Results of grading your code: ` + text
        );
    });

});

// const DBSOURCE = "./client/src/database.db";

// module.exports = (app, db) =>{

/************** Lesson Requests ****************/
// GET all Lessons
app.get('/api/Lesson/all', (req, res) => {
    let sql = 'SELECT * FROM Lesson GROUP BY lesson_number';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                "message": "Failure",
                "error": err.message
            });
            return;
        }
        res.json({
            message: "Success",
            data: rows
        });
    });
});

// GET single Lesson
app.get('/api/Lesson/:id', (req, res) => {
    let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
    let lesson_id = [req.params.id];

    // get query to database for lesson with :id
    db.get(sql, lesson_id, (err, row) => {
        if (err) {
            res.status(400).json({
                "error": err.message,
                "message": "Failure"
            });
            return;
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

function createGradingScript(code, lessonID) {

    runCmd("printf '%s' \"#!/usr/bin/env python\n" + code + "\" > ./grading_scripts/" + lessonID, function (text, error) {
        console.log(text);
        var res = 0;
        if (error) {
            res = 1;
        }
        return res;
    });
}

// Make a new lesson
app.post('/api/NewLesson', (req, res,next) => {
    // TODO set grade for this lesson for all students to 0
    let body = req.body;
    let lesson_id = uuidv4();
    let question = body.question;
    let answer = body.answer;
    let name = body.name;
    let hint = body.hint;
    // TODO add xml
    let xml = null;
    let code = body.code;

    let sql = 'SELECT MAX (lesson_number) FROM Lesson';
    db.get(sql, [], (err, row) => {
        if (err) {
            console.log(err);
            res.send("DB Failure");
        } else {
            console.log(row);
            lesson_number = row["MAX (lesson_number)"] + 1;
            // console.log(lesson_number);
            sql = 'INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml) VALUES (?,?,?,?,?,?,?)';
            let params = [lesson_id, lesson_number, question, answer, name, hint, xml];
            db.run(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    res.send("DB Failure");
                } else {
                    if (createGradingScript(code, lesson_id)) {
                        console.log("Error on lesson create");
                    }
                    else {
                        console.log("Lesson creation succecssful: " + name);
                        res.send("Success");
                    }
                }
            });
        }
    });
});

// Update an existing lesson
app.put('/api/UpdateLesson', (req, res,next) => {
    let body = req.body;
    let lesson_id = body.lesson_id;
    let question = body.question;
    let answer = body.answer;
    let name = body.name;
    let hint = body.hint;
    let code = body.code;
    // TODO add xml
    let xml = null;

    let sql = 'UPDATE Lesson SET question=?, answer=?, name=?, hint=?, xml=? WHERE lesson_id=?';

    let params = [question, answer, name, hint, xml, lesson_id];
    // console.log(params);
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
            res.send("DB Failure");
        } else {
            if (createGradingScript(code, lesson_id)) {
                console.log("Error on lesson create");
            }
            else {
                console.log("Lesson update succecssful: " + name);
                res.send("Success");
            }
        }
    });
});

// Remove an existing lesson. Will also cascade to remove any Grades linked to that lesson.
app.delete('/api/RemoveLesson', (req, res,next) => {
    let body = req.body;
    let lesson_id = body.lesson_id;

    let sql = 'DELETE FROM Lesson WHERE lesson_id=?';
    let params = [lesson_id];

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
            res.send("DB Failure");
        } else {
            runCmd("rm ./grading_scripts/"+lesson_id, function (text, error) {});
            console.log("Lesson removal succecssful: " + lesson_id);
            res.send("Success");
        }
    });
});

/****************** User Requests *****************/

app.get('/api/User/:userid', (req, res) => {
    let sql = 'SELECT * FROM User WHERE user_id = ?';
    let user_id = [req.params.userid];
    let params = user_id;

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                "error": err.message,
                "message": "Failure"
            })
            return;
        }
        res.json({
            message: "Success",
            data: row
        });
    });
});

app.get('/api/Student/all', (req, res) => {
    let sql = 'SELECT * FROM User WHERE is_teacher = 0';
    let params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                "error": err.message,
                "message": "Failure"
            })
            return;
        }
        res.json({
            message: "Success",
            data: rows
        });
    });
});

app.delete('/api/RemoveStudent', (req,res) => {
    let body = req.body;
    let username = body.username;

    let sql = 'DELETE FROM User WHERE username=?';
    let params = [username];
    console.log("Sent username: " + username);
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
            res.send("DB Failure");
        } else {
            runCmd("rm -rf ./users/" + username, function (text, error) {
                console.log("In runcmd callback");
                if(error){
                    console.log(error);
                }
            });
            console.log("Student Removed");
            res.send("Success");
        }
    });
});

// TODO make an api call to get a User's grades
// on all lessons

// TODO add api call for reordering lessons
//  params would be lesson_id and new lesson_number
// UPDATE Lesson SET lesson_number = lesson_number +1 WHERE lesson_number > ?, (value = old_lesson_num)
// UPDATE Lesson SET lesson_number = ? WHERE lesson_id = ?, (value = new_lesson_num, lesson_id)

//Only time we need to close database is on SIGINT
//    process.on('SIGINT', () =>{
//        db.close();
//    });
// };

app.listen(port, () => console.log(`Listening on port ${port}`));
