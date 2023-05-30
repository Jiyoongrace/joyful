import React, { useState } from "react";
import { Link } from "react-router-dom";
import './pagecss/template.css';
import './pagecss/font.css';
import Button from '../components/Button';


const MainPage = () => {

    const [value, setValue] = useState("&JOY 하러 가기");

  return (
    <div>
      <div id="template">
        
      <div id="back1">
        <img src="JOY.png" id="logo"></img>
        <p id="intro">1인 과외 관리를<br></br>
        편리하고 즐겁게,<span id="joy">JOY.</span></p>

        <Link to="/rolepage">
            <Button text={value} bgcolor={false}/>
        </Link>
        </div>
        </div>
    </div>
  )
}

export default MainPage
