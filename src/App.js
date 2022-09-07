import {useEffect, useState} from 'react';
import Dice from './components/Dice/Dice';
import Play from './components/Play/Play';
import './App.css';

let numbers=[];

function App() {
  const [buttonOnClick, setButtonOnClick] = useState(false);
  const [num, randomNum] = useState(Math.floor(Math.random() * 6) + 1);
  
  useEffect(()=>{
    if(buttonOnClick){
      setButtonOnClick(false);
    }
  });
  
  function onClick() {
    setButtonOnClick(true);
    randomNum(Math.floor(Math.random() * 6) + 1);
    numbers.push(num);
  }
  return (
    <div>
      <h1 className='header'>Давай отдыхать!</h1>
      <Dice buttonOnClick={buttonOnClick} numbers={numbers}></Dice>
      <Play numbers={numbers}/>
      <div className='Button'><button className='button' onClick={onClick}>Бросить кубик</button></div>
    </div>
  );
}

export default App;
