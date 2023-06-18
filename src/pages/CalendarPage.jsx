import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './pagecss/template.css';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import JOY2 from './JOY2.png';

const CalendarPage = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ id: '', userId: '', num: '', date: '' });
  const [update, setUpdate] = useState({ id: '', userId: '', num: '', date: '' });
  const { id, userId, num, date } = update;
  const [open, setOpen] = useState(false);
  const [tutorUsernames, setTutorUsernames] = useState([]);

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  useEffect(() => {
    // Fetch data from http://localhost:3001/lessons
    axios
      .get('http://localhost:3001/lessons')
      .then(({ data }) => setPosts(data))
      .catch((error) => console.error('Error fetching lessons:', error));
    
    // Fetch data from http://localhost:3001/userone
    axios
      .get('http://localhost:3001/userone')
      .then(({ data }) => {
        const filteredUsernames = data
          .filter((user) => user.tutorId === 'kariel1103')
          .map((user) => user.username);
        setTutorUsernames(filteredUsernames);
      })
      .catch((error) => console.error('Error fetching userone:', error));
  }, []);

  const handleDateChange = (selectedDate) => {
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const formattedDate = `${month}월 ${day}일`;

    setForm((prev) => ({ ...prev, date: formattedDate }));
    setUpdate((prev) => ({ ...prev, date: formattedDate }));
  };


  const getTileClassName = ({ date }) => {
    const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
    const hasLesson = posts.some((post) => post.date === formattedDate);
    return hasLesson ? 'react-calendar__tile--hasActive' : '';
  };

  return (
    <div>
      <div id="template">
        <div id="back2">
          <div>
            <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
          </div>
          <br />
          <br />
          <div>김눈송 선생님의 월간 과외 캘린더</div>
          <div style={{ padding: 20 }}>
            <Calendar
              value={new Date()}
              onChange={handleDateChange}
              locale="en-US"
              tileClassName={getTileClassName}
            />
          </div>
          <div id="fff">
            <span id="sss">+</span>&nbsp;
            <select
              id="selectStudent"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            >
              <option value="전체학생">학생선택</option>
              {tutorUsernames.map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </select>
          </div>
          <div id="ggg">학생 수업 추가</div>
          <div id="contt">
            <input
              type="text"
              id="bbbb"
              value={num}
              placeholder="회차 입력"
              style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4' }}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, num: e.target.value }));
                setUpdate((prev) => ({ ...prev, num: e.target.value }));
              }}
            />
            &nbsp; &nbsp;
            <input
              type="text"
              id="bbbb"
              value={date}
              placeholder="날짜 입력"
              style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4' }}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, date: e.target.value }));
                setUpdate((prev) => ({ ...prev, date: e.target.value }));
              }}
            />
          </div>
          <br />

          <div>
          <Link to="/cardpage">
              <button
                id="zz"
                onClick={() => {
                  // create
                  if (open === false) {
                    axios({
                      url: 'http://localhost:3001/lessons',
                      method: 'POST',
                      data: form,
                    })
                      .then(({ data }) => setPosts((prev) => [...prev, data]))
                      .catch((error) => console.error('Error creating lesson:', error));
                  }
                  // update
                  else {
                    axios({
                      url: `http://localhost:3001/lessons/${id}`,
                      method: 'PUT',
                      data: form,
                    })
                      .then(({ data }) =>
                        setPosts((prev) => prev.map((post) => (post.id === id ? data : post)))
                      )
                      .catch((error) => console.error('Error updating lesson:', error));

                    setUpdate((prev) => ({
                      ...prev,
                      id: '',
                      date: '',
                      subject: '',
                      class: '',
                      study: '',
                      hw: '',
                      progress: '',
                      pages: '',
                    }));
                    setOpen(false);
                  }
                }}
              >
                {open ? '수정완료' : '수업 입력'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;