----------------------------------------------------------------------
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Grade;

CREATE TABLE Lesson(
  lesson_id TEXT PRIMARY KEY,
  lesson_number INTEGER UNIQUE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  name TEXT NOT NULL,
  hint TEXT,
  xml XML
);
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('ab6da87d-eb81-4151-9715-1b0c24b6a2fe',
        1,
        'Return 20',
        '20',
        'Proof of Concept 1',
        'To declare a variable, do "var [variable name]"',
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment></block></xml>');
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('53499506-bd09-47e5-86e7-bcc83e04e9c1',
        2,
        'Return 10',
        '10',
        'Proof of Concept 2',
        'To declare a variable, do "var [variable name]"',
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment></block></xml>');
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('19efdb93-94d4-4fec-b74e-ac38b32366ea',
        3,
        'Create a program that will print out the text "Hello World!"',
        '''Hello World!''',
        'Hello World!',
        'Use the text category',
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment></block></xml>');

CREATE TABLE User(
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_teacher BIT NOT NULL
);

CREATE TABLE Grade(
  progress_xml XML,
  score INT DEFAULT 0,
  lesson_id TEXT NOT NULL,
  username TEXT NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES Lesson (lesson_id)
    ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (username) REFERENCES User (username)
    ON DELETE CASCADE ON UPDATE NO ACTION,
  PRIMARY KEY (lesson_id, username)
);
