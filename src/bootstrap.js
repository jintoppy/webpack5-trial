import React from 'react';
import ReactDOM from 'react-dom';
import MFE1Button from 'MFE1/Button';
import MFE2App from 'components/MFE2';
import ContainerApp from 'MFEContainer/App';

const App = () => {
    return (
        <>
            <h1>Parent app</h1>
            <div>
                <MFE1Button />
            </div>
            <div>
                <MFE2App />
            </div>
            <div>
                <ContainerApp />
            </div>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

