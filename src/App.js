import React from 'react';
import './App.css';
import { getQuotes } from './firebase_api/index';

function App() {
  getQuotes({}, snap => {
    console.log(snap);
  });

  return (
    <div className="Container">
    </div>
  );
}

export default App;
