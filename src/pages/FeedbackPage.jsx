import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import JOY2 from './JOY2.png';
import axios from 'axios';
import './pagecss/main.css';

const FeedbackPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const subject = searchParams.get('subject');
  const [currentValue, setCurrentValue] = useState(0);
  const [pagesValue, setPagesValue] = useState(0);
  const [studyList, setStudyList] = useState([]);
  const [completedSum, setCompletedSum] = useState(0);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };  

  useEffect(() => {
    axios.get('http://localhost:3001/lessons')
      .then(response => {
        const lessonsData = response.data;
        
        // userId와 subject가 일치하는 데이터를 필터링합니다.
        const filteredData = lessonsData.filter(item => item.userId === userId && item.subject === subject);
        
        // grade가 2인 데이터의 study들을 추출합니다.
        const studies = filteredData.filter(item => item.grade === 2).map(item => item.study);
        
        // 모든 completed들의 합을 계산합니다.
        const completedTotal = filteredData.reduce((total, item) => total + item.completed, 0);
        
        // 상태 변수에 데이터를 저장합니다.
        setStudyList(studies);
        setCompletedSum(completedTotal);
      })
      .catch(error => {
        console.error('Error fetching lessons data:', error);
      });
  }, [userId, subject]);

  useEffect(() => {
    axios.get('http://localhost:3001/subjects')
      .then(response => {
        const subjectsData = response.data;
        
        // userId와 subject가 일치하는 데이터를 찾습니다.
        const subjectData = subjectsData.find(item => item.userId === userId && item.subject === subject);
        
        // 찾은 데이터의 current와 pages 값을 가져옵니다.
        if (subjectData) {
          setCurrentValue(subjectData.current);
          setPagesValue(subjectData.pages);
        }
      })
      .catch(error => {
        console.error('Error fetching subjects data:', error);
      });
  }, [userId, subject]);

  return (
    <div id="template">
    <div id="back2">
    <div>
      <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
    </div>
    <div>
            <div>
              <div id="pp">
              <p>{userId} 학생의 {subject} 과목 피드백입니다.</p>

                <div id="crcr">
                  <label htmlFor="study"><span id="fifi">●&nbsp;</span>8회차 총 진도</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    value={'현재 '+ pagesValue+'페이지 중 '+ currentValue+'페이지 완료'}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="grade"><span id="fifi">●&nbsp;</span>학습 능력이 부족한 단원</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    value={studyList.join(", ")}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="hw"><span id="fifi">●&nbsp;</span>숙제 이행률</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    value={'80점 만점에 ' + completedSum + '점을 받았습니다.'}
                  />
                </div>

              </div>
            </div>
          </div>
    </div>
    </div>
  )
}

export default FeedbackPage