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
        '<xml xmlns="https://developers.google.com/blockly/xml">
          <variables>
              <variable id="rW.TeakWv!]:#87+o/5T">result</variable>
          </variables>
          <block type="procedures_defreturn" id="A`T1jB`Th0:nJU!r^8c`" x="350" y="110">
              <field name="NAME">grade</field>
              <comment pinned="false" h="80" w="160">Describe this function...</comment>
              <statement name="STACK">
                  <block type="controls_if" id="sC7*q2X]+x%rB,YqtEI!">
                      <mutation else="1" />
                      <value name="IF0">
                          <block type="logic_compare" id="(WzUpRH+DTHFL1E4jhAn">
                              <field name="OP">EQ</field>
                              <value name="A">
                                  <block type="user_code" id="~I;G:-$!1e4#2r^_uaY2" />
                              </value>
                              <value name="B">
                                  <block type="math_number" id="z$.O|NrO,`2AR,9}Tz5v">
                                      <field name="NUM">20</field>
                                  </block>
                              </value>
                          </block>
                      </value>
                      <statement name="DO0">
                          <block type="variables_set" id="LjwM#jhSX(/=I5t!Tw_h">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="u!?e+;z(VH8;h*G_6-UN">
                                      <field name="NUM">100</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                      <statement name="ELSE">
                          <block type="variables_set" id="pXltD}O%PtH@`2dOoCv+">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="[SAX0~w~Opcf`INw.rF@">
                                      <field name="NUM">0</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                  </block>
              </statement>
              <value name="RETURN">
                  <block type="variables_get" id="gq,#cgiI3xzwyV@.cGG;">
                      <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                  </block>
              </value>
          </block>
      </xml>');
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('53499506-bd09-47e5-86e7-bcc83e04e9c1',
        2,
        'Return 10',
        '10',
        'Proof of Concept 2',
        'To declare a variable, do "var [variable name]"',
        '<xml xmlns="https://developers.google.com/blockly/xml">
          <variables>
              <variable id="rW.TeakWv!]:#87+o/5T">result</variable>
          </variables>
          <block type="procedures_defreturn" id="A`T1jB`Th0:nJU!r^8c`" x="350" y="110">
              <field name="NAME">grade</field>
              <comment pinned="false" h="80" w="160">Describe this function...</comment>
              <statement name="STACK">
                  <block type="controls_if" id="sC7*q2X]+x%rB,YqtEI!">
                      <mutation else="1" />
                      <value name="IF0">
                          <block type="logic_compare" id="(WzUpRH+DTHFL1E4jhAn">
                              <field name="OP">EQ</field>
                              <value name="A">
                                  <block type="user_code" id="~I;G:-$!1e4#2r^_uaY2" />
                              </value>
                              <value name="B">
                                  <block type="math_number" id="z$.O|NrO,`2AR,9}Tz5v">
                                      <field name="NUM">10</field>
                                  </block>
                              </value>
                          </block>
                      </value>
                      <statement name="DO0">
                          <block type="variables_set" id="LjwM#jhSX(/=I5t!Tw_h">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="u!?e+;z(VH8;h*G_6-UN">
                                      <field name="NUM">100</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                      <statement name="ELSE">
                          <block type="variables_set" id="pXltD}O%PtH@`2dOoCv+">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="[SAX0~w~Opcf`INw.rF@">
                                      <field name="NUM">0</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                  </block>
              </statement>
              <value name="RETURN">
                  <block type="variables_get" id="gq,#cgiI3xzwyV@.cGG;">
                      <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                  </block>
              </value>
          </block>
      </xml>');
INSERT INTO Lesson(lesson_id, lesson_number, question, answer, name, hint, xml)
VALUES('19efdb93-94d4-4fec-b74e-ac38b32366ea',
        3,
        'Create a program that will print out the text "Hello World!"',
        '''Hello World!''',
        'Hello World!',
        'Use the text category',
        '<xml xmlns="https://developers.google.com/blockly/xml">
          <variables>
              <variable id="rW.TeakWv!]:#87+o/5T">result</variable>
          </variables>
          <block type="procedures_defreturn" id="A`T1jB`Th0:nJU!r^8c`" x="350" y="110">
              <field name="NAME">grade</field>
              <comment pinned="false" h="80" w="160">Describe this function...</comment>
              <statement name="STACK">
                  <block type="controls_if" id="sC7*q2X]+x%rB,YqtEI!">
                      <mutation else="1" />
                      <value name="IF0">
                          <block type="logic_compare" id="(WzUpRH+DTHFL1E4jhAn">
                              <field name="OP">EQ</field>
                              <value name="A">
                                  <block type="user_code" id="~I;G:-$!1e4#2r^_uaY2" />
                              </value>
                              <value name="B">
                                  <block type="text" id="z$.O|NrO,`2AR,9}Tz5v">
                                      <field name="TEXT">Hello World</field>
                                  </block>
                              </value>
                          </block>
                      </value>
                      <statement name="DO0">
                          <block type="variables_set" id="LjwM#jhSX(/=I5t!Tw_h">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="u!?e+;z(VH8;h*G_6-UN">
                                      <field name="NUM">100</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                      <statement name="ELSE">
                          <block type="variables_set" id="pXltD}O%PtH@`2dOoCv+">
                              <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                              <value name="VALUE">
                                  <block type="math_number" id="[SAX0~w~Opcf`INw.rF@">
                                      <field name="NUM">0</field>
                                  </block>
                              </value>
                          </block>
                      </statement>
                  </block>
              </statement>
              <value name="RETURN">
                  <block type="variables_get" id="gq,#cgiI3xzwyV@.cGG;">
                      <field name="VAR" id="rW.TeakWv!]:#87+o/5T">result</field>
                  </block>
              </value>
          </block>
      </xml>');

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
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (username) REFERENCES User (username)
    ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (lesson_id, username)
);
