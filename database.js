var sqlite = require('sqlite3').verbose();
var fs = require('fs');
const DBSOURCE = "./client/src/database.db";

module.exports = (app) =>{
    //Open and load database into object
    let db = new sqlite.Database('./client/src/database.db', (err) =>{
        if (err){
            throw err;
                }
        else{
            console.log("Connected to database");
        }
    });

    /*GET all lessons. Returns in this format:
        data: [{ "lesson_id" : lesson_id1, ...}, {"lesson_id" : lesson_id2, ...}]
    */
    app.get('/api/Lesson/all', (req,res) => {
        let sql = 'SELECT * FROM Lesson  ';
        let params = [];

        //In case we need to run multiple queries in the future
        db.serialize( () => {
            db.all(sql, params, (err, rows) =>{
                if (err){
                    res.status(400).json({
                        "error" : err.message,
                        "message" : "Failure"});
                    return;
                }
                res.json({
                    message: "Succ",
                    data: rows
                });
            });
        });
    });
    //GET single lesson
    app.get('/Lesson/:id', (req, res) => {
        console.log("Requesting single Lesson");
        let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
        let lessonNum = [req.params.id];

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
                    message: "Succ2",
                    data: row
                });
            });
        });
    });

    //Only time we need to close database is on SIGINT
//    process.on('SIGINT', () =>{
//        db.close();
//    });
};
