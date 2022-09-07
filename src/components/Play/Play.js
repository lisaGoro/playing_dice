import { useState } from "react";
import Legs from './Legs';
import Hands from './Hands';
import Head from './Head';
import Back from './Back';
import Eyes from './Eyes';
import './Play.css';

function Play({numbers}) {
  const [bodyParts, setBodyParts] = useState(' ');
  
  function changeBodyParts(e) {
    switch (e.target.value) {
      case 'Выберите часть тела':
        setBodyParts(' ');
        break;
      case 'Упражнение для ног':
        setBodyParts('legs');
        break;
      case 'Упражнение для спины':
        setBodyParts('back');
        break;
      case 'Упражнение для глаз':
        setBodyParts('eyes');
        break;
      case 'Упражнение для рук':
        setBodyParts('hands');
        break;
      case 'Упражнение для головы':
        setBodyParts('head');
        break;
      default:
        break;
    }
  }

  return (
      <div className="App">
        <>
          <select className="bodyParts" onChange={(e) => changeBodyParts(e)}>
            <option>Выберите часть тела</option>
            <option>Упражнение для головы</option>
            <option>Упражнение для глаз</option>
            <option>Упражнение для спины</option>
            <option>Упражнение для рук</option>
            <option>Упражнение для ног</option>
          </select>
        </>
        <div className="secondBodyParts">
          {bodyParts === 'legs' ? <Legs numbers={numbers}></Legs> :
            bodyParts === 'back' ? <Back numbers={numbers}></Back> :
              bodyParts === 'eyes' ? <Eyes numbers={numbers}></Eyes> :
                bodyParts === 'hands' ? <Hands numbers={numbers}></Hands> :
                  bodyParts === 'head' ? <Head numbers={numbers}></Head> : 
                    ' '}
        </div>
      </div>
  );
}
export default Play;