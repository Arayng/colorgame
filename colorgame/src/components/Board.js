

function Board({gameState, color, boxArr, clickEvent}){
  let boxColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
  let length = (95 / gameState.boxRow).toPrecision(5);
  return(
    <div className="board">
      {
        boxArr.map((target,index)=>(
          <div className={`box ${target}`} key={index} style={{
              width: length+'%',
              height: length+'%',
              backgroundColor: boxColor,
              opacity: gameState.targetIndex === index ? gameState.opacity : '1'
            }}
            onClick={()=>{clickEvent(index)}}
          ></div>
        ))
      }
    </div>
  )
}

export default Board;