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
      return callback("\`\`\`"+stdout+"\`\`\`");
      }
   });
}

app.get('/api/connect', (req, res) => {
  res.send({ express: 'Connected to server' });
});

app.post('/api/grade', (req, res) => {
  console.log(req.body);
  runCmd("echo received data",function(text,error) {
  console.log(text);
});
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
