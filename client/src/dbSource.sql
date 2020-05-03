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

CREATE TABLE User(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT UNIQUE,
  password TEXT NOT NULL,
  is_teacher BIT
);
