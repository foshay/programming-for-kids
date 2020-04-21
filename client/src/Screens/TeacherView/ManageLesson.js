import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button} from "@blueprintjs/core";

class ManageLesson extends Component {
render() {
    return (
      //<div className="App" position="fixed">
      <div >
        
        <main className="Body">
            <div className="bp3-button-group bp3-large bp3-vertical" >

                  {/* <li><Link to="/Home"><Button class="bp3-menu-item bp3-icon-layout-home" icon="home" text="Home"/></Link></li> */}
                  <ul><Link to="/LessonMenu"><Button type="button" class="bp3-button bp3-icon-layout-book" icon="book" text="Lessons" /></Link></ul>
                  <ul><Link to="/CardGame"><Button type="button" class="bp3-button bp3-icon-layout-ninja" icon="ninja" text="Card Game" /></Link></ul>
                  <ul><Button type="button" class="bp3-button bp3-icon-layout-cog" disabled ={true} icon="cog" text="Settings" /></ul>
                  <ul><Link to="/"><Button type="button" class="bp3-button bp3-icon-layout-log-out" intent="danger" icon="log-out" text="Log-Out" /></Link></ul>

            </div>
        </main>

        </div>
    );
  }
}

export default ManageLesson;