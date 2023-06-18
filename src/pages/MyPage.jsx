import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './pagecss/main.css';
import axios from 'axios';

const MyPage = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const username = searchParams.get('username');
  const [tutorUsernames, setTutorUsernames] = useState([]);

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
    history.push('/mainpage');
  };

  return (
    <div>
      <div id="template">
        <div id="back3">
          <img src="JOY2.png" id="logo3" alt="로고" />
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
