import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './pagecss/template.css';
import JOY2 from './JOY2.png';

const SubjectPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [form, setForm] = React.useState({ id: '', userId: '', subject: '', pages: '' });
  const [update, setUpdate] = React.useState({ id: '', userId: '', subject: '', pages: '' });
  const { id, userId, subject, pages } = update;
  const [open, setOpen] = React.useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [tutorUsernames, setTutorUsernames] = useState([]);
  
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  React.useEffect(() => {
    // read
    axios({ url: 'http://localhost:3001/subjects', method: 'GET' }).then(
      ({ data }) => setPosts(data)
    );
  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:3001/userone').then(({ data }) => {
      const filteredUsernames = data
        .filter((user) => user.tutorId == 'kariel1103') // Adjust the condition based on your data structure
        .map((user) => user.username);
      setTutorUsernames(filteredUsernames);
    });
  }, []);

  return (
    <div>
      <div id="template">
        
        <div id="back2">

        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
        <div id="fff">&nbsp;
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
            </select> <span id="ssss">학생의</span><br></br> <span id="sssss">수업을 추가해 주세요.</span></div>
        

        <div id="pp"><br></br><span id="ppp">과목</span><br></br><br></br><br></br>
              <input
          type='text'
          id="bbbbb"
          value={subject}
          placeholder='과목를 입력하세요.'
          style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, subject: e.target.value }));
            setUpdate((prev) => ({ ...prev, subject: e.target.value }));
          }}
        /></div>
        <div id="pp"><br></br><span id="ppp">총 페이지 수</span><br></br><br></br><br></br>
        <input
        type='number'
        id="bbbbb"
        value={pages}
        placeholder='총 페이지 수를 입력하세요.'
        style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4' }}
        onChange={(e) => {
          setForm((prev) => ({ ...prev, pages: parseInt(e.target.value) }));
          setUpdate((prev) => ({ ...prev, pages: parseInt(e.target.value) }));
        }}
      /></div>
        <br></br>

        <Link to="/cardpage"><button id="zzz"
          onClick={() => {
            // create
              axios({
                url: 'http://localhost:3001/subjects',
                method: 'POST',
                data: form,
              }).then(({ data }) => setPosts((prev) => [...prev, data]));
            
          }}
        >
          {open ? '수정완료' : '완료'}
        </button></Link>
      </div>
      </div>
      </div>
      
  )
}

export default SubjectPage