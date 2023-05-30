import React, { useEffect, useState } from 'react'
import './pagecss/template.css';
import { useNavigate } from 'react-router-dom';

function StartPage () {
 
	const navigate = useNavigate();
	const timeout = () => {
		setTimeout(() => {
			navigate('/mainpage');
		}, 3000);
	};
	useEffect(() => {
		timeout();
		return () => {
			clearTimeout(timeout);
		};
	}); 
  return (
    <div>
      <div id="template">
        
      <div id="back1">
        <img src="JOY.png" id="logo"></img>
        <img src="index.png" id="index"></img>
        </div>
        </div>
    </div>
  )
}



export default StartPage

