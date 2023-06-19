import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import './pagecss/main.css';
import axios from 'axios';
import JOY2 from './JOY2.png';

const MyPagee = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const username = searchParams.get('username');
  const [tutorUsernames, setTutorUsernames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  useEffect(() => {
    const fetchTutorUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/userone');
        const filteredUsernames = response.data
          .filter((user) => user.tutorId === userId)
          .map((user) => user.username);
        setTutorUsernames(filteredUsernames);
      } catch (error) {
        console.error('튜터 username 가져오기 실패:', error);
        // 에러 처리
      }
    };

    fetchTutorUsernames();
  }, [userId]);

  const handleLogout = () => {
    // 로그아웃 로직을 수행합니다. (예: 세션 클리어, 토큰 제거 등)

    // 메인 페이지로 리디렉션합니다.
    window.location.href = '/mainpage';
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <div>
      <div id="template">
        <div id="back2">
          <div>
            <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
          </div>
          <br></br>
          <br></br>
          <div className="centered-container">
              <img src="noonsong.png" alt="Selected Image" className="centered-image" />
            <p className="centered-text">
              <span id="tea">김눈송</span>
              <br />
              과외 선생님
            </p>
          </div>


              <div id="jjtt">아이디</div>
              <input 
              type='text'
              id="bbbbb"
              value="noonsong1234"
              style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
              ></input>

              <br></br><br></br>

              <div id="jjtt">관리 학생</div>
          <input
            type="text"
            id="bbbbb"
            value="카리나, 윈터, 이숙명"
            style={{
              border: '1px solid #C9C9C9',
              borderRadius: '15px',
              backgroundColor: '#fff4f4'
            }}
          />

          <button onClick={handleLogout} className="centered-button">
            &JOY 로그아웃
          </button>
        </div>

      </div>


    </div>
  );
};

export default MyPagee;
