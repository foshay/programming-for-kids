import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// blueprint imports
import { Button } from '@blueprintjs/core';

// Our components
import ToggleToolbox from './ToggleToolbox.js';

// Blockly imports
import Blockly from 'blockly';
import ReactBlocklyComponent from 'react-blockly/dist-modules';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';
require('blockly/python');

const jwt = require('jsonwebtoken');
const secret = "this is temporary"

class BlocklyComp extends Component{
  state ={
    toolboxCategories: '',
    code: '',
    newXml: '',
    initialXml: this.props.initialXml,

    gradeResponse: '',
    connectedResponse: '',
  }

  componentDidMount = () => {
    this.checkApiConnection();
    var toolbox = this.loadBlocks();

    // This runs if initialXml is being passed in without an api call
    // i.e. when making New Lesson
    if (this.props.initialXml){
      // since there is no re render between loading toolbox and rendering
      // the editor, we must pass in the toolbox
      this.renderEditor(toolbox);
    }
  }

  componentDidUpdate = (prevProps) => {
    // This runs if a new intialXml has loaded from the database
    if (this.props.initialXml !== prevProps.initialXml) {
      console.log("InitialXml updated");
      this.renderEditor();
    }
  }

  // This renders the blockly editor by setting the div with id='blockly'
  // to be a blocklyEditor
  renderEditor = (toolbox) => {
    // toolboxCategories is passed in if there was no waiting
    // for a promise to finish. Otherwise, toolbox has been
    // loaded into the toolboxCategories state because the page
    // was re rendered when the new initialXml was passed in through the
    // props after being loaded in the api call
    var toolboxCategories;
    if (toolbox) { toolboxCategories = toolbox; }
    else { toolboxCategories = this.state.toolboxCategories; }
    const Editor =
      <ReactBlocklyComponent.BlocklyEditor
        // The block categories to be available.
        toolboxCategories={toolboxCategories} //this is obvious what it does
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: '#0000FF',
            snap: true,
          },
        }}
        //we can possibly change the initial xml on a per lesson basis... or not
        initialXml={this.props.initialXml}
        //the div wrapper that will be generated for blockly
        wrapperDivClassName="fill-height"
        //what method to call when the workspace changes
        workspaceDidChange={(workspace) => this.workspaceDidChange(workspace)}
      />

    // TODO find a better way to render the editor
    if (document.getElementById('blockly') !== null)
      ReactDOM.render(Editor, document.getElementById('blockly'));
  }

  loadBlocks = () => {
    var toolboxCategories = parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML);
    if (this.props.edit) {
      // make a block for user_code
      Blockly.Blocks['user_code'] = {
        init: function () {
          this.appendValueInput("input")
            .setCheck(null)
            .appendField("User Code");
          this.setOutput(true, null);
          this.setColour(0);
          this.setTooltip("This block runs the user's written code");
          this.setHelpUrl("");
        }
      };
      Blockly.Python['user_code'] = function (block) {
        var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
        var code = 'usercode(' + value_input + ')';
        return [code, Blockly.Python.ORDER_NONE];
      }
      toolboxCategories = toolboxCategories.concat([
          {
            // TODO add color
            name: 'User code',
            blocks: [
              { type: 'user_code' },
            ],
          },
      ]);
      this.setState({ toolboxCategories: toolboxCategories });
    }
    else {
      // makes a block for MNIST
      Blockly.Blocks['mnist'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("learning rate");
          this.appendValueInput("learning_rate")
              .setCheck("Number");
          this.appendDummyInput()
              .appendField("momentum");
          this.appendValueInput("momentum")
              .setCheck("Number");
          this.appendDummyInput()
              .appendField("log interval");
          this.appendValueInput("log_interval")
              .setCheck("Number");
          this.appendDummyInput();
          this.appendValueInput("NAME")
              .setCheck(null);
          this.setNextStatement(true, null);
          this.setColour(15);
       this.setTooltip("This takes a long time to run, upwards of 5 minutes.");
       this.setHelpUrl("");
        }
      };
      Blockly.Python['mnist'] = function(block) {
        var value_learning_rate = Blockly.Python.valueToCode(block, 'learning_rate', Blockly.Python.ORDER_ATOMIC);
        var value_momentum = Blockly.Python.valueToCode(block, 'momentum', Blockly.Python.ORDER_ATOMIC);
        var value_log_interval = Blockly.Python.valueToCode(block, 'log_interval', Blockly.Python.ORDER_ATOMIC);
        var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
        // TODO: Assemble Python into code variable.
        var code = '...\n';
        return code;
      };
      var mnistFunction = Blockly.Python.provideFunction_(
        'run_mnist',
        [ 'function' + Blockly.Python.mnistFunction_ + 
      'def mnistcode():',
      '\timport torch',
      '\timport torchvision',
      '\timport torch.nn as nn',
      '\timport torch.nn.functional as F',
      '\timport torch.optim as optim',
      '\tn_epochs = 1',
      '\tbatch_size_test = 1000',
      '\tbatch_size_train = 32',
      '\tlearning_rate = 0.01',
      '\tmomentum = 0.5',
      '\tlog_interval = 10',
      '\trandom_seed = 1',
      '\ttorch.backends.cudnn.enabled = False',
      '\ttorch.manual_seed(random_seed)',
      '\ttrain_loader = torch.utils.data.DataLoader(torchvision.datasets.MNIST(\'./files/\', train=True, download=True,transform=torchvision.transforms.Compose([torchvision.transforms.ToTensor(),torchvision.transforms.Normalize((0.1307,), (0.3081,))])),batch_size=batch_size_train, shuffle=True)',
      '\ttest_loader = torch.utils.data.DataLoader(torchvision.datasets.MNIST(\'./files/\', train=False, download=True,transform=torchvision.transforms.Compose([torchvision.transforms.ToTensor(),torchvision.transforms.Normalize((0.1307,), (0.3081,))])),batch_size=batch_size_test, shuffle=True)',
  
      '\tclass Net(nn.Module):',
          '\t\tdef __init__(self):',
              '\t\t\tsuper(Net, self).__init__()',
              '\t\t\tself.conv1 = nn.Conv2d(1, 10, kernel_size=5)',
              '\t\t\tself.conv2 = nn.Conv2d(10, 20, kernel_size=5)',
              '\t\t\tself.conv2_drop = nn.Dropout2d()',
              '\t\t\tself.fc1 = nn.Linear(320, 50)',
              '\t\t\tself.fc2 = nn.Linear(50, 10)',
  
          '\t\tdef forward(self, x):',
          '\t\t\tx = F.relu(F.max_pool2d(self.conv1(x), 2))',
          '\t\t\tx = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))',
          '\t\t\tx = x.view(-1, 320)',
          '\t\t\tx = F.relu(self.fc1(x))',
          '\t\t\tx = F.dropout(x, training=self.training)',
          '\t\t\tx = self.fc2(x)',
          '\t\t\treturn F.log_softmax(x)',
      '\tnetwork = Net()',
      '\toptimizer = optim.SGD(network.parameters(), lr=learning_rate,momentum=momentum)',
      '\ttrain_losses = []',
      '\ttrain_counter = []',
      '\ttest_losses = []',
      '\ttest_counter = [i*len(train_loader.dataset) for i in range(n_epochs + 1)]',
      '\tdef train(epoch):',
        '\t\tnetwork.train()',
        '\t\tfor batch_idx, (data, target) in enumerate(train_loader):',
            '\t\t\toptimizer.zero_grad()',
            '\t\t\toutput = network(data)',
            '\t\t\tloss = F.nll_loss(output, target)',
            '\t\t\tloss.backward()',
            '\t\t\toptimizer.step()',
            '\t\t\tif batch_idx % log_interval == 0:',
                print('Train Epoch: {} [{}/{} ({:.0f}%)]\tLoss: {:.6f}'.format(
                  epoch, batch_idx * len(data), len(train_loader.dataset),
                  100. * batch_idx / len(train_loader), loss.item()))
                train_losses.append(loss.item())
                train_counter.append(
                  (batch_idx*64) + ((epoch-1)*len(train_loader.dataset)))
                torch.save(network.state_dict(), './results/model.pth')
                torch.save(optimizer.state_dict(), './results/optimizer.pth')
      def test():
          network.eval()
          test_loss = 0
          correct = 0
          with torch.no_grad():
              for data, target in test_loader:
                  output = network(data)
                  test_loss += F.nll_loss(output, target, size_average=False).item()
                  pred = output.data.max(1, keepdim=True)[1]
                  correct += pred.eq(target.data.view_as(pred)).sum()
          test_loss /= len(test_loader.dataset)
          test_losses.append(test_loss)
          print('\nTest set: Avg. loss: {:.4f}, Accuracy: {}/{} ({:.0f}%)\n'.format(
          test_loss, correct, len(test_loader.dataset),
          100. * correct / len(test_loader.dataset)))
          return (100. * correct / len(test_loader.dataset))
      for epoch in range(1, n_epochs+1):
          train(epoch)
      return int(test().item())
  
      ]);
      toolboxCategories = toolboxCategories.concat([
          {
            // TODO add color
            name: 'AI category',
            blocks: [
              { type: 'mnist' },
            ],
          },
        ]);
      this.setState({ toolboxCategories: toolboxCategories });
    }
    return toolboxCategories;
  }

  // This is to show the user whether they are connected to the grading server
  checkApiConnection = () => {
    fetch('/api/connect')
    .then(response => {
      // if (response.status !== 200) {
      //   throw Error(response.json.message);
      // }
      return response.json();
    })
    .then(json => {
      // TODO don't render if not connected?
      this.setState({connectedResponse: json.message});
    });
  }

  // Checks the token and calls the api/grade call if the token is valid
  handleSubmit = (e) => {
    e.preventDefault();
    var username;
    var token = localStorage.getItem('nccjwt');
    if (!token) {
      console.log("No Token");
    }
    else {
      var userCode = this.state.code;
      var newXml = this.state.newXml;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) { return; }
        // TODO possibly add grading for teacher as they test the code they made
        if (decoded.is_teacher) { return; }
        username = decoded.username;
      });
      fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lessonID": this.props.lessonID,
          "code": userCode,
          "username": username,
          "xml": newXml
        })
      })
      .then((response) => {
        console.log(response);
        return response.json();
      }).then((json) => {
        this.setState({gradeResponse: json.message});
        console.log(json);
      });
    }
  }

  workspaceDidChange = (workspace) => {
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    const oldCode = this.state.code;
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.Python.workspaceToCode(workspace);

    // We need to send the code and newXml up to the manageLesson comp
    // it can then be sent to the api
    if (this.props.edit) {
      this.props.setCode(code);
      this.props.setXml(newXml);
    }
    else {
      this.setState({ newXml: newXml });
      this.setState({ code: code });
      // if code has changed
      // Save lesson progress
      if (code !== oldCode && oldCode) {
        console.log(oldCode);
        console.log(code);
        var username;
        var token = localStorage.getItem('nccjwt');
        if (!token) {
          console.log("No Token");
        }
        else {
          jwt.verify(token, secret, (err, decoded) => {
            if (err) { return; }
            username = decoded.username;
          });
          fetch('/api/SaveLessonProgress/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "lesson_id": this.props.lessonID,
              "username": username,
              "xml": newXml
            })
          })
            .then((response) => {
              return response.json();
            }).then((json) => {
              console.log("Saving progress...");
              console.log(json);
            });
        }
      }
    }
  }

  GradeButton = () => {
    // don't show the grade button if this is being shown for editing a lesson
    if (this.props.edit) {
      return <div/>
    }
    else {
      return (
        <Button
          text={"Grade code"}
          large
          icon="tick"
          id="gradeButton"
          intent="success"
          onClick={(e) => this.handleSubmit(e)}
        />
      )
    }
  }

  render = () => {
    return (
      <div>
        <ToggleToolbox/>
        <div style={{ height: '600px', width: `100%` }} id="blockly" />
        <p>{this.state.gradeResponse}</p>
        <this.GradeButton/>
        <p>{this.state.connectedResponse}</p>
      </div>
    )
  }

}
export default BlocklyComp