----------------------------------------------------------------------
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS User;

CREATE TABLE Lesson(
  lesson_id TEXT PRIMARY KEY,
  lesson_number INTEGER UNIQUE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  name TEXT NOT NULL,
  hint TEXT,
  xml TEXT
);
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('ab6da87d-eb81-4151-9715-1b0c24b6a2fe',
        1,
        'Return 20',
        '20',
        'Proof of Concept 1',
        'To declare a variable, do "var [variable name]"',
        NULL);
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('53499506-bd09-47e5-86e7-bcc83e04e9c1',
        2,
        'Return 10',
        '10',
        'Proof of Concept 2',
        'To declare a variable, do "var [variable name]"',
        NULL);
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('19efdb93-94d4-4fec-b74e-ac38b32366ea',
        3,
        'Create a program that will print out the text "Hello World!"',
        '''Hello World!''',
        'Hello World!',
        'Use the text category',
        NULL);

-- INSERT INTO Lesson(lesson_id,question, answer, name, hint)
-- VALUES(4,
--         'Create an integer, float, char, and string, assign values to them,
--             and print them out with their type',
--         'var a = 10\n
--             var b = 10.05
--             var c = "C"
--             var d = "words" ',
--         'Variables',
--         'Use the type() function');

-- INSERT INTO Lesson(lesson_id,question, answer, name, hint)
-- VALUES(5,
--         'Declare 3 integers. Add the first two together and save the result.\n
--             Then subtract the third from that result. \n
--             Then multiply that result by the first number.\n
--             Then divide the result by the second number.\n
--             Print the final result.\n',
--         'var a = 2\n
--             var b = 5\n
--             var c = 8\n
--             var result = a + b\n
--             result = result - c\n
--             result = result * a\n
--             result = result / 2\n
--             print result\n',
--         'Basic Operators',
--         'Remember these operators: (+,-,*,/)');

---------------------------------------------------------------------
CREATE TABLE User(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  is_teacher BIT,
);

INSERT INTO User(user_id, first_name, last_name, username, password, is_teacher)
VALUES(1,
        'Jane',
        'Doe',
        'Teacher1',
        '$2b$10$9hiwF2xfI8Y8GBKhTKTcs.tr9.3zy/DjjhqsqZeIBJoEXNorGDxUK',
        1);

INSERT INTO User(user_id, first_name, last_name, username, password, is_teacher)
VALUES(2,
        'Johnny',
        'Test',
        'JohnnyTest',
        '$2b$10$edG89TNDma3Dvb/O2sBxn.A5Tl.5FCnAXf6OjosVY9/Z7Zvyau81u',
        0);


