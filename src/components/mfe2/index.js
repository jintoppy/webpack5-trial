import './App.scss';
import React from 'react';
import MFE1Button from 'MFE1/Button';

// const MFE1Button = React.lazy(
//   () => import('MFE1/Button')
// );


function App() {
    return (
        <div className="mfe2">
            <h1>MFE2 Starts</h1>
            <div>
                {/* <React.Suspense fallback='Loading Button'> */}
                <MFE1Button />
                {/* </React.Suspense> */}
            </div>
            <h2>MFE2 Ends</h2>
        </div>
    );
}

export default App;
