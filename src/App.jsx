import React, { useState } from 'react';
import './App.css';
import Split from './components/Split';
import html2canvas from 'html2canvas';

function App() {
  const [text, setText] = useState("first");
  
  const downloadBill = () => {
    html2canvas(document.querySelector('.mainDiv')).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'FairSplits.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }


  return (
    <div className='mainDiv'>
      <div className='display_none'>
        <h2 className={`${text !== "first" ? 'display_none' : ''} fontBold color_red`}>First</h2>
        <h2 className={text !== "second" ? 'display_none' : ''}>Second</h2>
        <button onClick={() => setText("second")}>Change</button>
      </div>
      <div className='mainScreen'>
        <h1 className='text_center logo'>FairSplits</h1>
        <Split downloadBill={downloadBill}/>
      </div>
    </div>
  );
}

export default App;

// https://billsplits.netlify.app/#
// https://splitsbill.netlify.app/#
// https://sharebills.netlify.app/#
// https://billssplit.netlify.app/about#
// https://fairsplit.netlify.app/
// https://FairSplit.netlify.app/