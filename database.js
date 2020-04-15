var sqlite = require('sqlite3').verbose();
const DBSOURCE = "./client/src/database.db";

module.exports = (app, db) =>{


/************** Lesson Requests ****************/
    //GET all Lessons
    app.get('/api/Lesson/all', (req,res) => {
        let sql = 'SELECT * FROM Lesson  ';
        let params = [];
        db.all(sql, params, (err, rows) =>{
            if (err){
                res.status(400).json({
                    "error" : err.message,
                    "message" : "Failure"});
                return;
            }
            res.json({
                message: "Success",
                data: rows});
        });
    });

    //GET single Lesson
    app.get('/Lesson/:id', (req, res) => {
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
