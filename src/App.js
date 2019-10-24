import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetQuotes } from './firebase_api/index';

function App() {
  GetQuotes(snap => {
    console.log(snap);
    console.log(process.env.REACT_APP_API_KEY);
  });

  return (
    <div className="Container">
      a
    </div>
  );
}

export default App;
