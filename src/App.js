import './css/App.css';
import { useState } from 'react';
import Header from './components/Header';
function App() {
 let [scrambeledSentence, setScrambeledSentence] = useState('');
 let [scrambeledSentence2, setScrambeledSentence2] = useState('');
 let [wordArray, setWordArray] = useState([]);
 let [sentenceArr, setSentenceArr] = useState([]);
 let [roundScore, setRoundScore] = useState(0);
 let [roundArr, setRoundArr] = useState([]);
 let [roundComplete, setRoundComplete] = useState(false);
 let [requestCounter, setrequestCounter] = useState(1);
 let [gameWon, setGameWon] = useState(false);

 return (
  <div className='App'>
   <Header
    scrambeledSentence={scrambeledSentence}
    setScrambeledSentence={setScrambeledSentence}
    scrambeledSentence2={scrambeledSentence2}
    setScrambeledSentence2={setScrambeledSentence2}
    wordArray={wordArray}
    setWordArray={setWordArray}
    sentenceArr={sentenceArr}
    setSentenceArr={setSentenceArr}
    roundScore={roundScore}
    setRoundScore={setRoundScore}
    roundArr={roundArr}
    setRoundArr={setRoundArr}
    roundComplete={roundComplete}
    setRoundComplete={setRoundComplete}
    requestCounter={requestCounter}
    setrequestCounter={setrequestCounter}
    gameWon={gameWon}
    setGameWon={setGameWon}
   />
   <div id='winning-container'>
    <div
     className={`${gameWon === false ? 'hide-block' : ''}`}
     id='winning-block'
    >
     You win!
    </div>
   </div>
  </div>
 );
}

export default App;
