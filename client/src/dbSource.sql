----------------------------------------------------------------------
CREATE TABLE Lesson(
  lesson_id INT PRIMARY KEY NOT NULL,
  next_lesson_id INT,
  prev_lesson_id INT,
  name TEXT NOT NULL,
  hint TEXT,
  lesson_xml TEXT
);

INSERT INTO Lesson(lesson_id, next_lesson_id, prev_lesson_id, name, hint)
VALUES(1, 2, NULL, 'Hello World!', 'Print the name of this lesson.');

INSERT INTO Lesson(lesson_id, next_lesson_id, prev_lesson_id, name, hint)
VALUES(2, 1, 3, 'Variables', 'Declare the variables, then print them.');

INSERT INTO Lesson(lesson_id, next_lesson_id, prev_lesson_id, name, hint)
VALUES(3, NULL, 2, 'Simple Operators', 'Use the appropriate operators.');

---------------------------------------------------------------------
CREATE TABLE Student(
  student_id INT PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

INSERT INTO Student(student_id, first_name, last_name)
VALUES(1, 'John', 'Smith');

INSERT INTO Student(student_id, first_name, last_name)
VALUES(2, 'Jane', 'Doe');
