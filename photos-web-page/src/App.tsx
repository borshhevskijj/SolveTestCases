import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Photos } from './photos/Photos';


function App() {




  return (
    <div style={{ padding: '5% 10%', backgroundColor: '#f7f7f7', minHeight: '100vh' }} className="App">
      <Photos />
    </div>
  );
}

export default App;
