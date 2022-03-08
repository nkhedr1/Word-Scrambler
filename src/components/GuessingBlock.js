import React from 'react';
import { useEffect } from 'react';
import '../css/GuessingBlock.css';
import { useRef } from 'react';

const GuessingBlock = (props) => {
 const ref = useRef();
 let nextElement;
 let nextElId = props.refElement + 1;
 let roundArray;
 let roundCompleteTrigger;

 const textInput = (e) => {
  roundArray = props.roundArr;
  roundCompleteTrigger = props.roundComplete;

  // checks for correct input
  if (props.block.toLowerCase() === e.target.value.toLowerCase()) {
   e.target.style.backgroundColor = '#4caf50';
   roundArray[props.refElement] = 'correct';
   if (nextElId < props.arrLength) {
    nextElement = document.getElementById(`block${nextElId}`);
    nextElement.focus();
   }
  }

  // checks for space input
  else if (
   props.block.toLowerCase() !== e.target.value.toLowerCase() &&
   props.block.toLowerCase() === ' '
  ) {
   e.target.style.backgroundColor = '#ffb74d';
   roundArray[props.refElement] = 'wrong';
  }

  // checks for wrong input
  else {
   e.target.style.backgroundColor = '#e1e1e1';
   roundArray[props.refElement] = 'wrong';
  }

  if (props.roundArr.includes('wrong') === false) {
   roundCompleteTrigger = true;
   props.setRoundComplete(roundCompleteTrigger);
  }

  props.setRoundArr(roundArray);
 };

 useEffect(() => {
  if (props.refElement === 0) {
   ref.current.focus();
  }
 }, []);

 return (
  <div className='guessing-block-container1'>
   <input
    id={'block' + props.refElement}
    ref={ref}
    type='text'
    maxLength='1'
    onInput={(e) => textInput(e)}
   />
  </div>
 );
};

export default GuessingBlock;
