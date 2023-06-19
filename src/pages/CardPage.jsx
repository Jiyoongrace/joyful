import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pagecss/main.css';
import { Link } from 'react-router-dom';
import JOY2 from './JOY2.png';

const CardPage = () => {
  const [posts, setPosts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ userId: 'all', subject: 'all' });
  const [ratio, setRatio] = useState(0);
  const navigate = useNavigate();
  const [tutorUsernames, setTutorUsernames] = useState([]);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const handleButtonClick = () => {
    const url = `/feedbackpage?userId=${form.userId}&subject=${form.subject}`;
    navigate(url);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/subjects').then(({ data }) => {
      setSubjects(data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/lessons').then(({ data }) => {
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    const { userId, subject } = form;
    let url = 'http://localhost:3001/lessons';

    if (userId !== 'all') {
      url += `?userId=${userId}`;
    }
    if (subject !== 'all') {
      url += userId !== 'all' ? `&subject=${subject}` : `?subject=${subject}`;
    }

    axios.get(url).then(({ data }) => {
      setPosts(data);
    }).catch((error) => {
      console.log(error);
    });

    const selectedSubject = subjects.find(
      (subj) => subj.userId === userId && subj.subject === subject
    );
    if (selectedSubject) {
      const calculatedRatio = ((selectedSubject.current / selectedSubject.pages) * 100).toFixed(2);
      setRatio(calculatedRatio);
    } else {
      setRatio(0);
    }
  }, [form, subjects]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/userone').then(({ data }) => {
      const filteredUsernames = data
        .filter((user) => user.tutorId === 'kariel1103') // Adjust the condition based on your data structure
        .map((user) => user.username);
      setTutorUsernames(filteredUsernames);
    });
  }, []);

  const progressBarStyles = {
    width: `${ratio}%`,
    backgroundColor: '#8596FF',
    height: '20px',
    borderRadius: '10px',
  };

  return (
    <div>
      <div id="template">
        <div id="back3">
        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
          <div id="aa">
            <select
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            >
              <option value="all">전체 학생</option>
              {tutorUsernames.map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </select>
            <span id="cc"> &nbsp; 학생의</span>
          </div>
          <Link to="/subjectpage" id="ccc">
            +
          </Link>
          <div>
            <form>
              <select
                name="subject"
                id="bb"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              >
                <option value="all">전체 과목</option>
                {subjects
                  .filter((subject) => subject.userId === form.userId)
                  .map((subject) => (
                    <option key={subject.id} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))}
              </select>
            </form>
            <span id="dd">
              진도율은 &nbsp;
              <span id="ee">{ratio}%</span> &nbsp;입니다.
            </span>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
                marginTop: '15px',
              }}
            >
              <div style={progressBarStyles}></div>
            </div>
          </div>

          <div>
            <br></br>
            {posts.map((post) => {
              return (
                <div
                  key={`post_${post.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '7px',
                  }}
                >
                  <div id="card">
                    <div id="ff">
                      <span id="ii">●</span> {post.date} 수업
                    </div>
                    <div id="gg">
                      {post.num}회차 <span id="hh"> / 8회차</span>
                    </div>
                    <div id="cont">
                      <div id="jj">오늘의 진도</div> &nbsp;
                      <div
                        id="bbb"
                        style={{
                          border: '1px solid #C9C9C9',
                          borderRadius: '20px',
                          backgroundColor: '#fff4f4',
                        }}
                      >
                        &nbsp;&nbsp;{post.study}
                      </div>
                    </div>
                    <div id="cont">
                      <div id="jj">오늘의 숙제</div> &nbsp;
                      <div
                        id="bbb"
                        style={{
                          border: '1px solid #C9C9C9',
                          borderRadius: '20px',
                          backgroundColor: '#fff4f4',
                        }}
                      >
                        &nbsp;&nbsp;{post.hw}
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <Link to={`/classpage/${post.id}?student=${form.userId}&subject=${form.subject}`}>
                      <button id="zz">일지 수정</button>
                    </Link>
                    &nbsp;&nbsp;
                    <button
                      id="zz"
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3001/lessons/${post.id}`)
                          .then(() => setPosts((prev) => prev.filter((item) => post.id !== item.id)))
                          .catch((e) => {
                            console.log(e);
                          });
                      }}
                    >
                      수업 완료
                    </button>
                    
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={handleButtonClick}>feedback</button>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
