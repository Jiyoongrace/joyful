import React from 'react'
import { Link } from "react-router-dom";
import './pagecss/template.css';


const SignupPageB = () => {

  return (

    <div>
        <div id="template">
        
        <div id="back2">

        <img src="JOY2.png" id="logo2"></img>

        <br></br><br></br>
        <form action="/auth/register_process" method="post">
            <p><input class="login" type="text" name="tutorid" placeholder="선생님아이디"></input></p>
            <p><input class="login" type="tel" name="parenttel" placeholder="학부모전화번호"></input></p>

    <p><input class="login" type="text" name="username" placeholder="이름"></input></p>
    <p><input class="login" type="id" name="userid" placeholder="아이디"></input></p>
    <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></input></p>    
    <p><input class="login" type="password" name="pwd2" placeholder="비밀번호 재확인"></input></p>
    <p><input id="btn3" type="submit" value="&JOY"></input></p>
    </form>            
    <p><Link to="/loginpage">로그인 화면으로 돌아가기</Link></p>
        </div>
        </div>
    </div>
  )
}

export default SignupPageB
