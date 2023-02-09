import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

function Header({lifeArr, setLife, stage}){

  return(
    <header>
      <div className="lifebox">
        {
          lifeArr.map((life, i)=>(
            <FontAwesomeIcon icon={life} className='life' key={i}/>
          ))
        }
      </div>
      <p className="stage">Stage {stage}</p>
      <div className="spacer"></div>
    </header>
  )
}

export default Header;