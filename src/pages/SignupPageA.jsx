import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from 'react';
import './pagecss/template.css';


const SignupPageA = () => {
  const [posts, setPosts] = React.useState([]);
  const [form, setForm] = React.useState({ id: '', username: '', userId: '', userPw: '' });
  const [update, setUpdate] = React.useState({ id: '', username: '', userId: '', userPw: '' });
  const { id, username, userId, userPw  } = update;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
      // read
      axios({ url: 'http://localhost:3001/userone', method: 'GET' }).then(
        ({ data }) => setPosts(data)
      );
  }, []);

  return (
    <div>
        <div id="template">
        
        <div id="back2">

        <img src="JOY2.png" id="logo2"></img>

        <br></br><br></br>
    <p><input class="login" type="text" name="username" value={username} placeholder="이름" onChange={(e) => {
      setForm((prev) => ({ ...prev, username: e.target.value }));
      setUpdate((prev) => ({ ...prev, username: e.target.value }));
    }}/></p>
    <p><input class="login" type="id" name="userId" value={userId} placeholder="아이디" onChange={(e) => {
      setForm((prev) => ({ ...prev, userId: e.target.value }));
      setUpdate((prev) => ({ ...prev, userId: e.target.value }));
    }}/></p>
    <p><input class="login" type="password" name="userPw" value={userPw} placeholder="비밀번호" onChange={(e) => {
      setForm((prev) => ({ ...prev, userPw: e.target.value }));
      setUpdate((prev) => ({ ...prev, userPw: e.target.value }));
    }}/></p>    
    <p><input class="login" type="password" name="userPw" placeholder="비밀번호 재확인"/></p>
    <Link to="/loginPage"><input id="btn3" type="submit" value="&JOY"
          onClick={() => {
            // create
            if (open === false) {
              axios({
                url: 'http://localhost:3001/userone',
                method: 'POST',
                data: form,
              }).then(({ data }) => setPosts((prev) => [...prev, data]));
            }
          }}
        />  </Link>      
    <p><Link to="/loginpage">로그인 화면으로 돌아가기</Link></p>
        </div>
        </div>
    </div>
  )
}

export default SignupPageA
