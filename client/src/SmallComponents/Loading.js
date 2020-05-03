import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { usePromiseTracker } from 'react-promise-tracker';

// class Loading extends Component {
export const Loading = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <div className="Body">
            {promiseInProgress === true ?
                <BounceLoader /> :
                null
            }
        </div>

    );

    // return promiseInProgress &&
    //     <div className={"Body"}>
    //         <BounceLoader/>
    //     </div>

    // if (promiseInProgress) {
    //     return (
    //         <div className={"Body"} >
    //             <BounceLoader />
    //         </div>
    //     );
    // }
    // else {
    //     return (
    //         <div />
    //     )
    // }
};

// export default Loading;