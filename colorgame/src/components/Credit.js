

function Credit({ending, clearStage, start}){
  return(
    <div className="board ending">
      <p>{ending}</p>
      {
        ending !== '색감 게임 시작하기!'&& <p className="stage">클리어한 단계 : {clearStage}</p>
      }
      <div className="btn" onClick={()=>{start(true)}}>시작</div>
    </div>
  )
}

export default Credit;