const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');

const app = express();
const port = process.env.PORT || 5000;

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

/*GET all lessons. Returns in this format:
    data: [{ "lesson_id" : lesson_id1, ...}, {"lesson_id" : lesson_id2, ...}]
*/
app.get('/api/Lesson/all', (req,res) => {
    let sql = 'SELECT * FROM Lesson  ';
    let params = [];
    //Open database
    let db = new sqlite.Database('./client/src/database.db', (err) =>{
        if (err){
            throw err;
        }
    });

    //In case we need to run multiple queries in the future
    db.serialize( () => {
        db.all(sql, params, (err, rows) =>{
            if (err){
                res.status(400).json({
                    "error" : err.message,
                    "message" : "Failure"});
                return;
            }
            console.log("All rows: " + rows[0] + rows[1] + rows[2]);
            res.json({
                message: "Succ",
                data: rows
            });
        });
    });
    db.close((err) =>{
        if(err){
            throw err;
        }
    });
});

//GET single lesson
app.get('/api/lesson/:id', (req, res) => {
    let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
    let lessonNum = [req.params.id];
    //Open database
    let db = new sqlite.Database('./client/src/database.db', (err) =>{
        if (err){
            throw err;
        }
    });

    //If we need to do more than one query here in the future
    db.serialize( () => {
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
                data: row
                /*
                [{"lesson_id" : row.lesson_id,
                "next_lesson_id" : row.next_lesson_id,
                "prev_lesson_id" : row.prev_lesson_id,
                "name" : row.name,
                "hint" : row.hint,
                "xml" : row.lesson_xml
                }]*/
            });
        });
    });
    //close database
    db.close((err) =>{
        if(err){
            throw err;
        }
    });
});


app.post('/api/register', (req, res) => {
    console.log("body "+req.body.username+" "+req.body.password);
    console.log(req.body);
    runCmd("echo registering", function(text,error) {
        //console.log(text);
    });
    res.send(`Registration complete`,
    );
});
app.post('/api/login', (req, res) => {
   console.log("body "+req.body.username+" "+req.body.password);
   console.log(req.body);
   runCmd("echo logging in", function(text,error) {
       //console.log(text);
   });
   res.send(`Login complete`,
   );
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
    runCmd("printf \""+req.body.code+"\" > ./users/6969/pcode/"+req.body.lesson+" && ./backend/run_python_script.sh ./grading_scripts/"+req.body.lesson+" ./users/6969/pcode/"+req.body.lesson+" "+req.body.lesson +" && rm ./users/6969/pcode/"+req.body.lesson,function(text,error) {
  console.log(text);

  res.send(
   `I received your POST request. This is what you sent me: ` + text,
 );
});

});

app.listen(port, () => console.log(`Listening on port ${port}`));
