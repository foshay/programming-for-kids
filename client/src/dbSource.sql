----------------------------------------------------------------------
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS User;

CREATE TABLE Lesson(
  lesson_id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  name TEXT NOT NULL,
  hint TEXT,
  xml TEXT
);
INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(1,
        'Return 20',
        '20',
        'Proof of Concept 1',
        'To declare a variable, do "var [variable name]"');

INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(2,
        'Return 10',
        '10',
        'Proof of Concept 2',
        'To declare a variable, do "var [variable name]"');

INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(3,
        'Create a program that will print out the text "Hello World!"',
        'Use the print function',
        'Hello world!',
        'Use the text category');

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
  password TEXT NOT NULL
);

INSERT INTO User(user_id, first_name, last_name, username, password)
VALUES(1, 'John', 'Smith', 'smithj', 'password');

INSERT INTO User(user_id, first_name, last_name, username, password)
VALUES(2, 'Jane', 'Doe', 'doej', '12345678');
