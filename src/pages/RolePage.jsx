import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pagecss/template.css';

const RolePage = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    username: '',
    userId: '',
    userPw: '',
    confirmPassword: '',
    tutorId: '', 
    parents: '', 
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    // 필요한 입력값 유효성 검사 등을 수행합니다.
    // ...

    // 회원가입을 위한 데이터를 준비합니다.
    const userData = {
      username: form.username,
      userId: form.userId,
      userPw: form.userPw,
      tutorId: form.tutorId,
      parents: form.parents,
    };

    // axios를 사용하여 회원가입 요청을 보냅니다.
    axios
      .post('http://localhost:3001/userone', userData)
      .then((response) => {
        // 회원가입 성공 시 처리할 로직을 작성합니다.
        // 예를 들어, 회원가입 완료 메시지를 표시하고 로그인 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
        console.log('회원가입 성공');
        // 예시로 로그인 페이지로 이동합니다.
        window.location.href = '/loginPage';
      })
      .catch((error) => {
        // 회원가입 실패 시 처리할 로직을 작성합니다.
        console.error('회원가입 실패:', error);
        // 예시로 실패 메시지를 표시하거나 알림을 띄울 수 있습니다.
      });
  };

  const handlePasswordMatch = (e) => {
    const { value } = e.target;
    setPasswordMatch(value === form.userPw);
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setOpen(value === 'student');
  };

  const renderTeacherForm = () => {
    return (
      <>
        <p>
          <input
            className="login"
            type="text"
            name="username"
            value={form.username}
            placeholder="이름"
            onChange={(e) => handleInputChange(e, 'username')}
          />
        </p>
        <p>
          <input
            className="login"
            type="text"
            name="userId"
            value={form.userId}
            placeholder="아이디"
            onChange={(e) => handleInputChange(e, 'userId')}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="userPw"
            value={form.userPw}
            placeholder="비밀번호"
            onChange={(e) => handleInputChange(e, 'userPw')}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 재확인"
            onChange={handlePasswordMatch}
          />
          {!passwordMatch && <span><br></br>비밀번호가 일치하지 않습니다.</span>}
        </p>
      </>
    );
  };

  const renderStudentForm = () => {
    return (
      <>
        <p>
          <input
            className="login"
            type="text"
            name="tutorId"
            value={form.tutorId}
            placeholder="선생님 아이디"
            onChange={(e) => handleInputChange(e, 'tutorId')}
          />
        </p>
        <p>
          <input
            className="login"
            type="tel"
            name="parents"
            value={form.parents}
            placeholder="학부모 전화번호"
            onChange={(e) => handleInputChange(e, 'parents')}
          />
        </p>
        <p>
          <input
            className="login"
            type="text"
            name="username"
            value={form.username}
            placeholder="이름"
            onChange={(e) => handleInputChange(e, 'username')}
          />
        </p>
        <p>
          <input
            className="login"
            type="text"
            name="userId"
            value={form.userId}
            placeholder="아이디"
            onChange={(e) => handleInputChange(e, 'userId')}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="userPw"
            value={form.userPw}
            placeholder="비밀번호"
            onChange={(e) => handleInputChange(e, 'userPw')}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 재확인"
            onChange={handlePasswordMatch}
          />
          {!passwordMatch && <span><br></br>비밀번호가 일치하지 않습니다.</span>}
        </p>
      </>
    );
  };

  return (
    <div>
      <div id="template">
        <div id="back2">
          <img src="JOY2.png" id="logo2" alt="Logo"></img>
          <br />
          <br />
          <div className="mb-3">
            <div className="form_toggle row-vh d-flex flex-row justify-content-between">
              <div className="form_radio_btn">
                <input
                  id="radio-1"
                  type="radio"
                  name="role"
                  value="tutor"
                  onChange={() => setOpen(false)}
                />
                <label htmlFor="radio-1">선생님</label>
              </div>
              <div className="form_radio_btn">
                <input
                  id="radio-2"
                  type="radio"
                  name="role"
                  value="student"
                  onChange={() => setOpen(true)}
                />
                <label htmlFor="radio-2">학생</label>
              </div>
              <p>
              
              </p>
            </div>
          </div>

          {open ? renderStudentForm() : renderTeacherForm()}

          <Link to="/loginPage">
            <input
              id="btn3"
              type="submit"
              value="&JOY"
              onClick={handleFormSubmit}
            />
          </Link>
          <Link to="/loginPage">
          <button id="btn4">로그인 하러 가기</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
