const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class DatabaseHandler {
    #db;
    dbname;
    lessonRows;     //Results of last Lesson query stored here
    studentRows;    //Results of last Student query stored here

    constructor(dbName){
        this.dbname = dbName;
        this.lessonRows = [];
        this.studentRows = [];
    }
    //Open the database for queries
    _openDB(){
        this.db = new sqlite3.Database('./database.db', (err) =>{
            if (err){throw err;}});
    }
    //Close the database
    _closeDB(){
        this.db.close((err) =>{
            if(err){throw err;}});
    }

    /***********************************
    * Name: addLessonXML
    * Arguments:
        lessonNumber - integer representing the lesson number
        filename - string of the name of the file containing xml for the lesson
    * Description:
        Put the xml from some file into the relevant Lesson entity in the database
    * Return: none
    ***********************************/
    addLessonXML(lessonNumber, fileName){
        var lessonxml = fs.readFileSync(fileName, 'utf-8');
        this._openDB();
        var sql = 'UPDATE Lesson SET lesson_xml = ? WHERE lesson_id = ?';
        this.db.run(sql, [lessonxml, lessonNumber], (err) =>{
            if(err) throw err;
        });
        this._closeDB();
    }

    /************************************************
    * Name: getLesson
    * Arguments:
          lessonNumber-Integer: A number representing the desired lesson number
      Description:
          Take the passed lesson number and run a SELECT statement to
          the database to retrieve the lesson.
      Return:
          On success, returns a list representing a lesson entity
          as [lessonid, next_lesson_id, prev_lesson_id, name, hint]
          On fail, it returns an ampty list.
    */
    async getLesson(lessonNumber){
        this._openDB();
        let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
        await this.db.get(sql, [lessonNumber], await function(err, rows){
            //Error handling
            if(err){
                throw err;
                this.lessonRows = [];
            }
            //Success: save data
            this.lessonRows = rows;
            console.log("Row id in getLesson, inside callback: " + this.lessonRows.lesson_id);
        });
        //close db and return lessonRows
        this._closeDB();
        console.log("Row id in getLesson, outside callback: " + this.lessonRows.lesson_id);

        return this.lessonRows;
    }
}
module.exports = {DatabaseHandler};
