----------------------------------------------------------------------
CREATE TABLE Lesson(
  lesson_id INT PRIMARY KEY NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  name TEXT NOT NULL,
  hint TEXT,
  xml TEXT
);

INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(1,
        'Create a program that will print out the text \"Hello World!\"'
        'Use the print function',
        'Hello world!',
        'Use the function print()');

INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(2,
        'Create an integer, float, char, and string, assign values to them,
            and print them out with their type',
        'var a = 10\n
            var b = 10.05\n
            var c = \'C\'\n
            var d = \'words\'',
        'Variables',
        'Use the type() function');

INSERT INTO Lesson(lesson_id,question, answer, name, hint)
VALUES(3,
        'Declare 3 integers. Add the first two together and save the result.\n
            Then subtract the third from that result. \n
            Then multiply that result by the first number.\n
            Then divide the result by the second number.\n
            Print the final result.\n',
        'var a = 2\n
            var b = 5\n
            var c = 8\n
            var result = a + b\n
            result = result - c\n
            result = result * a\n
            result = result / 2\n
            print result\n',
        'Basic Operators',
        'Remember these operators: (+,-,*,/)');

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
