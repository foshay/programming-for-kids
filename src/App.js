import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      
    <div style={{height: "600px", width: "800px"}} id="blockly"></div>
    <textarea disabled="yes" id="code" style={{height: "200px", width: "400px"}} value=""></textarea>
    <button id="gradeButton">Grade code</button>
    </div>
    
  );
}

export default App;
