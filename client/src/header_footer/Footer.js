import React, { Component } from 'react';
import Header_Footer from "../CSS_files/header_footer.css"
import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class Footer extends Component {
    render(){
        return(
            <div className = "Footer">
                {/* <h3 className = "Footer-Title">Footer test</h3> */}
                <h3 className = "Footer-Title"></h3>
            </div>
        )
    }
}

export default Footer