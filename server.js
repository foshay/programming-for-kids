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
        if (callback) {
            return callback(stdout);
        }
    });
}

// Register a user
// Makes either a student or a teacher
// If student
    // Make a user directory
    // Make grade entries for all existing lessons
// If teacher
    // check otp token
// Insert user into user table
app.post('/api/register', async (req, res, next) => {
    let body = req.body;
    // console.log(body);
    let username = body.username;
    let password = body.password;
    let first_name = body.first_name;
    let last_name = body.last_name;
    let user_type = body.user_type;
    let otp = body.otp;
    let sql = '';
    let params = '';


    // TODO add checking that password meets requirements
    // i.e. contains symbol, number of chars, etc.

    // Hash Password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            password_hash = hash;

            // Have to have these inside bcrypt because bcrypt is async
            if (user_type === "teacher") {
                is_teacher = true;
                // TODO check otp
                // if otp does not match, respond with error and return

                // check otp

                // otp does not match, return without inserting to database
            }
            else if (user_type === "student") {
                is_teacher = false;
            }
            else {
                // user_type must either be teacher or student
                res.status(400).json({
                    "message": "Invalid user type",
                });
                // return without inserting to database
                return;
            }

            // Insert new user to database
            sql = 'INSERT INTO User(first_name, last_name, username, password, is_teacher) VALUES (?,?,?,?,?)';
            params = [first_name, last_name, username, password_hash, is_teacher];
            console.log("Attempting user creation:");
            console.log(params);
            db.run(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        "message": "Username exists",
                    });
                    // username exists, return without doing more
                    return;
                }
                if (user_type === "student") {
                    // Create student directory via script
                    runCmd("./backend/create_user.sh " + username, function (text, err) {
                        if (text === "Failure") {
                            res.status(500).json({
                                "message": text,
                            });
                            console.log("Failure during user directory creation");
                            rimraf("./users/" + username);
                            // TODO see if we should run a command to remove the new user from
                            // the database now
                            return;
                        }
                    });
                    // Insert a row to Grade for each existing lesson for this user
                    // xml_progress is NULL, score is default 0
                    sql = 'INSERT INTO Grade(username, lesson_id) SELECT ?, lesson_id FROM Lesson';
                    params = [username];
                    db.run(sql, params, (err) => {
                        if (err) {
                            console.log(err);
                            console.log("Error populating grades: " + username);
                            // TODO remove row in User?
                            res.json({
                                "message": "Failure",
                            });
                            return;
                        }
                        console.log("Student creation succecssful: " + username);
                        res.json({
                            "message": "Success",
                        });
                    });
                }
                else {
                    console.log("Teacher creation succecssful: " + username);
                    res.json({
                        "message": "Success",
                    });
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
    console.log("Attempting login: ");
    console.log([username, password]);

    // Check if there is a user with 'username' in the User
    // table, then check that we were given correct password
    db.get(sql, [username], (err, row) => {
        //If the query is successful, compare the hash and return result
        if(!err && row !== undefined){
            let password_hash = row.password;
            let is_teacher = row.is_teacher;
            // Check the password
            bcrypt.compare(password, password_hash, (err, result) => {
                if(result === true){
                    //Sign a token with username as payload
                    console.log("Is teacher?: " + is_teacher);
                    var token = jwt.sign({username: username, teacher: is_teacher}, secret, {
                        expiresIn: 86400    //Expires in 24 hours
                    });
                    console.log("Successful login");
                    console.log("True token: " + token);
                    res.json({
                        "message": "Success",
                        "token": token
                    });
                }else{
                    // status: unauthorized
                    res.status(401).json({
                        "message": "Wrong password"
                    });
                }
            });
        }
        // If either db error, or username not in datbase
        else{
            res.json({"message": "Failure"});
        }
    });
});

//---------------------------------------------------------------  Grading api calls below here ----------------------------------------------------
app.get('/api/connect', (req, res, next) => {
    res.json({ message: 'Connected to the grading server' });
});

app.post('/api/grade', (req, res) => {
    // console.log(req.body);
    var body = req.body;
    var lesson_id = body.lessonID;
    var code = body.code;
    var username = body.username;

    var messageText;
    var errorText;

    runCmd("printf \"" + code + "\" > ./users/" + username+ "/pcode/" + lesson_id
        + " && ./backend/run_python_script.sh ./grading_scripts/" + lesson_id
        + " ./users/" + username+ "/pcode/" + lesson_id + " " + username+ " && rm ./users/"
        + username+ "/pcode/" + lesson_id, function (text, error) {
        if (error){
            messageText = "Something went wrong.";
            errorText = error;
        }
        else {
            console.log("Results of grading code: ");
            console.log(text);
            messageText = "Results of grading your code: " + text;
            let sql = 'UPDATE Grade SET score=? WHERE lesson_id=? AND username=?';
            let params = [text, username, lesson_id];
            db.run(sql, params, (error) => {
                if (error) {
                    messageText = "Database Error";
                    errorText = error;
                }
            });
        }
        res.json({
            message: messageText,
            error: errorText
        });
    });
});

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
        // console.log(row);
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

// GET single Lesson with username
app.get('/api/StudentLesson/:lesson_id/:username', (req, res) => {
    let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
    let lesson_id = req.params.lesson_id;
    let username = req.params.username;

    let data;
    let params;
    params = [lesson_id]

    // get query to database for lesson with :lesson_id
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                "error": err.message,
                "message": "Failure"
            });
            return;
        }
        data = row;
        // We don't want to return the xml of the teacher's grading script
        data.xml = '';

        // Check progress saved in the Grade table
        sql = 'SELECT progress_xml FROM Grade WHERE lesson_id = ? AND username = ?'
        params = [lesson_id, username];
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(500).json({
                    "error": err.message,
                    "message": "DB Failure"
                });
                console.log(err);
                return;
            }
            // Only change returned xml if progress has been made
            if (row.progress_xml) {
                data.xml = row.progress_xml;
                console.log("Progress_xml is present");
            }
            console.log("Retrieving lesson:");
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        });
    });
});

// Saves xml progress in grade table
app.post('/api/SaveLessonProgress/', (req, res) => {
    let body = req.body;
    let xml = body.xml;
    let lesson_id = body.lesson_id;
    let username = body.username;

    let sql = 'UPDATE Grade SET progress_xml=? WHERE lesson_id=? AND username=?';
    let params = [xml, lesson_id, username];

    db.run(sql, params, (err) => {
        if (err) {
            console.log("Progress update failed: ");
            console.log(err);
            res.status(500).json({
                "message": "DB Failure"
            });
        } else {
            console.log("Progress update succecssful: ");
            console.log([username, lesson_id, xml]);
            res.json({
                "message": "Success"
            });
        }
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

    let body = req.body;
    let lesson_id = uuidv4();
    let question = body.question;
    let answer = body.answer;
    let name = body.name;
    let hint = body.hint;
    let xml = body.xml;
    let code = body.code;

    let sql = 'SELECT MAX (lesson_number) FROM Lesson';
    db.get(sql, [], (err, row) => {
        if (err) {
            console.log(err);
            res.json({
                "message": "DB Failure"
            })
        } else {
            lesson_number = row["MAX (lesson_number)"] + 1;
            // console.log(lesson_number);
            // TODO change this to be just one call
            sql = 'INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml) VALUES (?,?,?,?,?,?,?)';
            let params = [lesson_id, lesson_number, question, answer, name, hint, xml];
            db.run(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        "message": "DB Failure",
                        "error": err
                    });
                    return;
                } else {
                    if (createGradingScript(code, lesson_id)) {
                        console.log("Error on lesson create");
                    }
                    else {
                        // TODO set grade for this lesson for all students to 0
                        // make an entry for all the usernames in the Grade table...?
                        sql = 'INSERT INTO Grade(lesson_id, username) SELECT ?, username FROM User WHERE is_teacher=0';
                        let params = [lesson_id];
                        db.run(sql, params, (err) => {
                            if (err){
                                console.log(err);
                                res.json({
                                    "message": "DB Failure",
                                    "error": err
                                });
                                return;
                            }
                            console.log("Lesson creation succecssful: " + name);
                            res.json({
                                "message": "Success",
                            });
                        });
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
    let xml = body.xml;
    let code = body.code;


    let sql = 'UPDATE Lesson SET question=?, answer=?, name=?, hint=?, xml=? WHERE lesson_id=?';

    let params = [question, answer, name, hint, xml, lesson_id];
    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
            res.json({
                "message": "DB Failure"
            })
        } else {
            if (createGradingScript(code, lesson_id)) {
                console.log("Error on lesson update");
                res.json({
                    "message": "Error creating grading script"
                })
            }
            else {
                console.log("Lesson update succecssful: " + name);
                res.json({
                    "message": "Success"
                })
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

app.get('/api/User/:username', (req, res) => {
    console.log("Student requested");
    let sql = 'SELECT * FROM User WHERE username = ?';
    let username = req.params.username;
    let params = [username];

    // TODO also return scores for each lesson, stored in Grade
    // scores should be in data.scores

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                "error": err.message,
                "message": "Failure"
            })
            return;
        }
        console.log("Retrieving user:");
        console.log(row);
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
