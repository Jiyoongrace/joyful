// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pagecss/template.css';

const LoginPage = () => {
  const [form, setForm] = useState({
    userId: '',
    userPw: '',
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    const userData = {
      userId: form.userId,
      userPw: form.userPw,
    };
  
    axios
      .get('http://localhost:3001/userone')
      .then((response) => {
        const { data } = response;
        const user = data.find((item) => item.userId === userData.userId);
  
        if (user && user.userPw === userData.userPw) {
          console.log('로그인 성공');
          window.location.href = `/mypage?userId=${user.userId}&username=${user.username}`;
        } else {
          console.log('아이디 또는 비밀번호가 일치하지 않습니다.');
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
      });
  };

  return (
    <div>
      <div id="template">
        <div id="back2">
          <img src="JOY2.png" id="logo2" alt="Logo" />
          <br />
          <br />
          <p>
            <input
              className="login"
              type="text"
              name="userId"
              placeholder="아이디"
              onChange={(e) => handleInputChange(e, 'userId')}
            />
          </p>
          <p>
            <input
              className="login"
              type="password"
              name="userPw"
              placeholder="비밀번호"
              onChange={(e) => handleInputChange(e, 'userPw')}
            />
          </p>
          <p>
            <button id="btn3" onClick={handleFormSubmit}>
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
