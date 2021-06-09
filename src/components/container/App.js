import React from 'react';
import MFE1Button from 'MFE1/Button';
import MFE2App from 'components/MFE2';
import loader from 'components/MFE2/loader.js';
import './App.scss';

function App() {
  return (
    <div className="container">
      <h2>This is conatainer</h2>
      <div>
        <MFE2App />
      </div>
      <div>
        <MFE1Button />
      </div>
    </div>
  );
}

export default App;
