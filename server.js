const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { exec } = require("child_process");
function runCmd(cmd,callback) {
   exec(cmd, (error, stdout, stderr) => {
      if (error != null) {
         console.log(`error: ${error.message}`);
         if (callback) {
            return callback("","Something went wrong.");
         }
      }
      if (stderr) {
         if(callback) {
            return callback("\`\`\`"+stderr+"\n"+stdout+"\`\`\`");
         }
      }
      console.log(stdout);
      if (callback) {
          console.log("Callback stdout");
      return callback("\`\`\`"+stdout+"\`\`\`");
      }
   });
}

app.get('/api/connect', (req, res) => {
  res.send({ express: 'Connected to the grading server' });
});

app.post('/api/grade', (req, res) => {
    console.log("body "+req.body.code+" "+req.body.lesson);
    console.log(req.body);
    var rand = Math.floor((Math.random() * 10000) + 1);
    runCmd("cd ./temp && echo \'"+req.body.code+"\' > temp"+rand+" && ../backend/run_python_script.sh ../grading_scripts/"+req.body.lesson+" ./temp"+rand,function(text,error) {
  console.log(text);
});
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.code}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
