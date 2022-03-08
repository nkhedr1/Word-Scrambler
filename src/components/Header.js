import React from 'react';
import { useEffect } from 'react';
import GuessingBlock from './GuessingBlock';
import '../css/Header.css';

const Header = (props) => {
 let counter = 1;
 let scrambeledSent;
 let scrambeledSent2;
 let scrambeledArr = [];
 let tempWord = [];
 let wordsArr = [];
 let sentenceArr = [];
 let roundScoreCounter = 0;
 let roundArray = [];
 let winningScore = 9;
 let gameComplete = false;

 function scrambleSetence(sentence) {
  wordsArr = sentence.split(' ');
  let tempString;
  props.setWordArray(wordsArr);

  sentenceArr = Array.from(scrambeledSent);
  props.setSentenceArr(sentenceArr);

  for (let i = 0; i < wordsArr.length; i++) {
   if (wordsArr[i].length > 3) {
    tempWord = Array.from(wordsArr[i]);
    for (let i = tempWord.length - 2; i > 0; i--) {
     const j = Math.floor(Math.random() * i + 1);
     [tempWord[i], tempWord[j]] = [tempWord[j], tempWord[i]];
    }
    tempString = tempWord.join('');
    scrambeledArr.push(tempString);
   } else {
    scrambeledArr.push(wordsArr[i]);
   }
  }
  scrambeledSent2 = scrambeledArr.join(' ');
  props.setScrambeledSentence2(scrambeledSent2);
 }

 function createRoundResult(array) {
  for (let x = 0; x < array.length; x++) {
   roundArray.push('wrong');
  }

  props.setRoundArr(roundArray);
 }

 function nextRound() {
  if (props.roundScore < winningScore) {
   props.setScrambeledSentence('');
   props.setScrambeledSentence2('');
   props.setWordArray([]);
   props.setSentenceArr([]);
   props.setRoundArr([]);
   // props.setRoundScore()

   const fetchSentence2 = async () => {
    roundScoreCounter = props.roundScore;
    counter = props.requestCounter;
    roundScoreCounter++;
    counter++;
    props.setrequestCounter(counter);
    props.setRoundScore(roundScoreCounter);

    const res = await fetch(
     `https://api.hatchways.io/assessment/sentences/${counter}`,
    );
    const data = await res.json();
    scrambeledSent = data.data.sentence;
    props.setScrambeledSentence(data.data.sentence);

    return data.data.sentence;
   };

   const getNewSentence = async () => {
    scrambeledSent = await fetchSentence2();
    scrambleSetence(scrambeledSent);
    createRoundResult(sentenceArr);
    sessionStorage.setItem('key', counter);
   };

   getNewSentence();
  } else {
   gameComplete = true;
   props.setGameWon(gameComplete);
  }
 }

 const fetchSentence = async () => {
  const res = await fetch(
   `https://api.hatchways.io/assessment/sentences/${counter}`,
  );
  const data = await res.json();
  scrambeledSent = data.data.sentence;
  props.setScrambeledSentence(data.data.sentence);
  return data.data.sentence;
 };

 useEffect(() => {
  roundScoreCounter = props.roundScore;
  counter = props.requestCounter;
  const getSentence = async () => {
   scrambeledSent = await fetchSentence();
   scrambleSetence(scrambeledSent);
   createRoundResult(sentenceArr);
   sessionStorage.setItem('key', counter);
  };

  getSentence();
 }, []);

 return (
  <div
   className={`${
    props.gameWon === true ? 'hide-toggle page-container' : 'page-container'
   }`}
  >
   <div id='scrambled-word'>{props.scrambeledSentence2}</div>
   <div className='instructions'>Guess the sentence! Start Typing</div>
   <div className='instructions'>The yellow blocks are meant for spaces</div>
   <div id='score'>Score: {props.roundScore}</div>
   <div id='guessing-block-break' className='guessing-block-container'>
    {props.sentenceArr.map((block, index) => (
     <>
      <div
       className={`${
        block === ' ' ? 'guessing-block-space' : 'guessing-block'
       }`}
      >
       <GuessingBlock
        key={index}
        block={block}
        refElement={index}
        arrLength={props.sentenceArr.length}
        roundArr={props.roundArr}
        setRoundArr={props.setRoundArr}
        roundArray={props.roundArray}
        roundComplete={props.roundComplete}
        setRoundComplete={props.setRoundComplete}
       />
      </div>
      <div
       className={`${block === ' ' ? 'beak-line' : 'break-line-invisible'}`}
      ></div>
     </>
    ))}
   </div>
   <div
    className={`${props.roundComplete === false ? 'hide-toggle' : ''}`}
    id='next-button-container'
   >
    <button onClick={() => nextRound()} type='button'>
     Next
    </button>
   </div>
  </div>
 );
};

export default Header;
