import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

class Loading extends Component {
    render(){
        return (
            <div className={"Body"} >
                <BounceLoader />
            </div>
        );
    }
}

export default Loading;