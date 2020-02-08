import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactBlocklyComponent from 'react-blockly';

function App() {
  return (
    <div className="App">
      
    <div style={{height: "600px", width: "800px"}} id="blockly">
    </div>
    <textarea id="code" style={{height: "200px", width: "400px"}} value=""></textarea>
    
    </div>
    
  );
}

export default App;
