import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetQuotes } from './firebase_api/index';

function App() {
  GetQuotes(snap => {
    console.log(snap);
  });

  return (
    <div className="Container">
      a
    </div>
  );
}

export default App;
