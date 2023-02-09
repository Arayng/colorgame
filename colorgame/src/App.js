import './App.scss';
import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR}  from "@fortawesome/free-regular-svg-icons";

// components //
import Header from './components/Header';
import Board from './components/Board';
import Credit from './components/Credit';

function App() {
  let [life, setLife] = useState(0);
  let [lifeArr, setLifeArr] = useState([]);
  let [stage, setStage] = useState(1);
  let [color, setColor] = useState({
    red: Math.floor(Math.random() * 101) + 90,
    green: Math.floor(Math.random() * 101) + 90,
    blue: Math.floor(Math.random() * 101) + 90
  })
  let [clearStage, setClearStage] = useState(0);
  let [gameStart, setGameStart] = useState(false);
  let [ending, setEnding] = useState('색감 게임 시작하기!')
  let [gameState, setGameState] = useState({
    boxRow: 3,
    targetIndex: 0,
    opacity: 0.38
  })
  let [boxArr, setBoxArr] = useState([])
  useEffect(()=>{
    setLifeArr(lifeSetting(life));
  },[life])
  useEffect(()=>{
    if(gameStart){
      setLife(3);
      setBoxArr(createBox(gameState,stage));
    };
  },[gameStart])

  const lifeSetting = (life) => {
    let newArr = []
    for(let k = 0; k < life; k++){
      newArr.push(faHeart)
    }
    for(life; life < 3; life++){
      newArr.push(faHeartR)
    }
    return newArr;
  }
  const targetCheck = (target) => {
    if(target === gameState.targetIndex){
      setStage(stage+1);
      setClearStage(stage)
      setBoxArr(createBox(gameState,stage));
    } else {
      if(life > 0){
        setLife(life-1);
      } else if (life === 0){
        setGameStart(false);
        setGameState((prevState) => ({
          ...prevState,
          boxRow: 3,
          opacity: 0.38
        }));
        setStage(1);
        setEnding(`게임 오버 !!`);
      }
    }
  }
  const colorSetting = () => {
    let newColor = {
      red: null,
      green: null,
      blue: null
    };
    newColor.red = Math.floor(Math.random() * 101) + 90;
    newColor.green = Math.floor(Math.random() * 101) + 90;
    newColor.blue = Math.floor(Math.random() * 101) + 90;

    setColor(newColor);
  }
  const createBox = (b,st) => {
    colorSetting();
    let boxTotal = 0;
    let newBoxArr = [];
    let newOpacity = 0.97;
    if(b.opacity <= 0.92){
      newOpacity = +(b.opacity + 0.02).toFixed(2);
    }
    if (st % 3 === 0 && b.boxRow < 12){
      let newBoxRow = b.boxRow + 1
      newOpacity = +(b.opacity + 0.03).toFixed(2);
      setGameState((prevState) => ({
        ...prevState,
        boxRow: newBoxRow,
        opacity: newOpacity
      }));
      boxTotal = newBoxRow * newBoxRow;
      newBoxArr = [...Array(boxTotal).keys()];
      return newBoxArr;
    }

    boxTotal = b.boxRow * b.boxRow;
    let targetIndex = Math.floor(Math.random() * boxTotal);
    setGameState((prevState) => ({
      ...prevState,
      targetIndex: targetIndex,
      opacity: newOpacity
    }));
    newBoxArr = [...Array(boxTotal).keys()];
    return newBoxArr;
  }
  return (
    <div className="App">
      <Header lifeArr={lifeArr} setLife={setLife} stage={stage}/>
      {
        gameStart? <Board gameState={gameState} color={color} boxArr={boxArr} clickEvent={targetCheck}/>:
        <Credit ending={ending} clearStage={clearStage}  start={setGameStart}/>
      }

    </div>
  );
}

export default App;
