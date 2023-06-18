import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import './pagecss/main.css';
import axios from 'axios';
import JOY2 from './JOY2.png';

const MyPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const username = searchParams.get('username');
  const [tutorUsernames, setTutorUsernames] = useState([]);

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

  return (
    <div>
      <div id="template">
        <div id="back3">
        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
          <div id="cardd">
            <div id="cont">
              <div id="jj">아이디</div> &nbsp; &nbsp;&nbsp;{userId}
            </div>
          </div>
          <br />
          <br />
          <br />
          {tutorUsernames.length > 0 && (
            <>
              <div id="carddd">
                <div id="cont">
                  <div id="jj">관리 학생</div> &nbsp; &nbsp;
                  <ul>
                    {tutorUsernames.map((tutorUsername) => (
                      <li key={tutorUsername}>{tutorUsername}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
