import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import JOY2 from './JOY2.png';
import Good from './Good.png';
import Soso from './Soso.png';
import Bad from './Bad.png';
import axios from 'axios';
import './pagecss/main.css';
import { Link } from 'react-router-dom';

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
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiData, setEmojiData] = useState({});

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setEmojiData((prevData) => ({
      ...prevData,
      [emoji]: prevData[emoji] + 1,
    }));
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/lessons')
      .then((response) => {
        const lessonsData = response.data;

        const filteredData = lessonsData.filter(
          (item) => item.userId === userId && item.subject === subject
        );

        const studies = filteredData
          .filter((item) => item.grade === 2)
          .map((item) => item.study);

        const completedTotal = filteredData.reduce(
          (total, item) => total + item.completed,
          0
        );

        setStudyList(studies);
        setCompletedSum(completedTotal);
      })
      .catch((error) => {
        console.error('Error fetching lessons data:', error);
      });
  }, [userId, subject]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/subjects')
      .then((response) => {
        const subjectsData = response.data;

        const subjectData = subjectsData.find(
          (item) => item.userId === userId && item.subject === subject
        );

        if (subjectData) {
          setCurrentValue(subjectData.current);
          setPagesValue(subjectData.pages);
        }
      })
      .catch((error) => {
        console.error('Error fetching subjects data:', error);
      });
  }, [userId, subject]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/subjects/${userId}/${subject}`)
      .then((response) => {
        const subjectData = response.data;
        if (subjectData && subjectData.emoji) {
          setEmojiData(subjectData.emoji);
        } else {
          setEmojiData({ "😊": 10, "🙂": 5, "😣": 3 });
        }
      })
      .catch((error) => {
        console.error('Error fetching emoji data:', error);
        setEmojiData({ "😊": 10, "🙂": 5, "😣": 3 });
      });
  }, [userId, subject]);

  return (
    <div id="template">
      <div id="back3">
        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
        <div>
          <div>
            <div id="pp">
              <p
                style={{
                  float: 'left',
                  textAlign: 'left',
                  marginLeft: '25px',
                  marginTop: '-5px',
                  paddingBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '25px',
                    fontFamily: 'Pretendard',
                    color: '#7789FF',
                    fontWeight: '800',
                  }}
                >
                  {userId}
                </span>{' '}
                학생의
                <br></br>
                <span
                  style={{
                    fontSize: '25px',
                    fontFamily: 'Pretendard',
                    color: '#784210',
                    fontWeight: '800',
                  }}
                >
                  {subject}
                </span>{' '}
                &nbsp;과목 피드백입니다.
              </p>

              <div id="crcr">
                <label htmlFor="study">
                  <span id="fifi">●&nbsp;</span>현재까지의 총 진도
                </label>
                <textarea
                  type="text"
                  style={{
                    fontSize: '20px',
                    border: '1px solid #C9C9C9',
                    borderRadius: '15px',
                    backgroundColor: '#fff4f4',
                    width: '297px',
                    padding: '10px',
                    fontFamily: 'Pretendard',
                    color: '#784210',
                    fontWeight: '600',
                    lineHeight: '25px',
                    height: '50px',
                  }}
                  value={`현재 ${pagesValue}페이지 중\n${currentValue}페이지의 진도가 완료되었습니다.`}
                />
              </div>
              <div id="crcr">
                <label htmlFor="grade">
                  <span id="fifi">●&nbsp;</span>학습 능력이 부족한 단원
                </label>
                <textarea
                  type="text"
                  style={{
                    fontSize: '20px',
                    border: '1px solid #C9C9C9',
                    borderRadius: '15px',
                    backgroundColor: '#fff4f4',
                    width: '297px',
                    padding: '10px',
                    fontFamily: 'Pretendard',
                    color: '#784210',
                    fontWeight: '600',
                    height: '110px',
                  }}
                  value={studyList.map((item) => `🔎 ${item}`).join('\n')}
                />
              </div>
              <div id="crcr">
                <label htmlFor="hw">
                  <span id="fifi">●&nbsp;</span>숙제 이행률
                </label>
                <textarea
                  type="text"
                  style={{
                    fontSize: '20px',
                    border: '1px solid #C9C9C9',
                    borderRadius: '15px',
                    backgroundColor: '#fff4f4',
                    width: '297px',
                    padding: '10px',
                    fontFamily: 'Pretendard',
                    color: '#784210',
                    fontWeight: '600',
                    lineHeight: '25px',
                    height: '53px',
                  }}
                  value={`${subject} 과목의\n${(
                    (completedSum / 80) *
                    100
                  ).toFixed(1)}%의 이행률을 기록했습니다.`}
                />
              </div>

              <div  style={{
                    border: '1px solid #C9C9C9',
                    borderRadius: '15px',
                    backgroundColor: '#F6F6F6',
                    width: '180px',
                    margin: '0 auto',
                    marginTop: '30px',
                    height: '95px',
                    lineHeight: '40px'
                  }}> 공감을 눌러주세요!
                {/* Emoji Components */}

                <img
                  src={Good}
                  alt="Joy Emoji"
                  onClick={() => handleEmojiClick('😊')}
                  style={{ opacity: selectedEmoji !== '😊' ? 0.3 : 1, width: "40px", marginTop: '5px' }}
                />
                <img
                  src={Soso}
                  alt="Smile Emoji"
                  onClick={() => handleEmojiClick('🙂')}
                  style={{ opacity: selectedEmoji !== '🙂' ? 0.3 : 1, width: "40px" }}
                />
                <img
                  src={Bad}
                  alt="Sad Emoji"
                  onClick={() => handleEmojiClick('😣')}
                  style={{ opacity: selectedEmoji !== '😣' ? 0.3 : 1, width: "40px" }}
                />
              </div><br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
