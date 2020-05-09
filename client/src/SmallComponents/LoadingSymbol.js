import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

class LoadingSymbol extends Component{
    render () {
        return (
            <div className="Body">
                <BounceLoader />
            </div>
        )
    }
}

export default LoadingSymbol;