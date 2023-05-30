import React from 'react'
import { Link } from "react-router-dom";
import './pagecss/template.css';

const RolePage = () => {
  return (
    <div>
    <div id="template">
        
        <div id="back2">

        <img src="JOY2.png" id="logo2"></img>

        <br></br><br></br>
        <form action="/auth/register_process" method="post">
    <div class="mb-3">
   <div class="form_toggle row-vh d-flex flex-row justify-content-between" >
      <div class="form_radio_btn" id="rrr">
      <Link to="/signuppageA"><input id="radio-1" type="radio" name="role" value="tutor"></input></Link>
         <label for="radio-1">선생님</label>
      </div>                      
      <div class="form_radio_btn" id="sss">
      <Link to="/signuppageB"><input id="radio-2" type="radio" name="role" value="student" checked ></input></Link>
         <label for="radio-2">학생</label>
      </div>
    <p><input id="btn3" type="submit" value="입력"></input></p>
    </div>
    </div>
    </form>  

    <p><Link to="/loginpage">로그인 화면으로 돌아가기</Link></p>

          </div>
          </div>
    </div>
    
  )
}

export default RolePage
