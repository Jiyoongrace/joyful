import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pagecss/main.css';
import JOY2 from './JOY2.png';
import './css/clcl.css';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const ClassPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedStudent = searchParams.get('student');
  const [studentnames, setStudentnames] = useState([]);
  const [post, setPost] = React.useState(null);
  const [update, setUpdate] = React.useState({ subject: '', study: '', hw: '', current: '', grade: '', completed: '' });
  const { subject, study, hw, current, grade, completed } = update;
  const [subjects, setSubjects] = React.useState([]);
  
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  useEffect(() => {
    const fetchStudentnames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subjects');
        const filteredStudentnames = response.data
          .filter((user) => user.userId === selectedStudent)
          .map((user) => user.subject);
        setStudentnames(filteredStudentnames);
      } catch(error) {
        console.error('가져오기 실패', error);
      }
    };
    fetchStudentnames();
  }, [selectedStudent]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3001/lessons/${id}`)
      .then(({ data }) => {
        setPost(data);
        setUpdate({
          subject: data?.subject || '',
          study: data?.study || '',
          hw: data?.hw || '',
          current: data?.current || '',
          grade: data?.grade || '',
          completed: data?.completed || '',
        });
      })
      .catch((error) => console.log(error));

    axios
      .get('http://localhost:3001/subjects')
      .then(({ data }) => {
        setSubjects(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/lessons/${id}`, {
        ...post,
        subject,
        study,
        hw,
        current: Number(current),
        grade: grade === '상' ? 10 : grade === '중' ? 5 : 2,
        completed: completed === 'O' ? 10 : completed === '△' ? 5 : 2,
      })
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          study,
          hw,
          current: Number(current),
          grade: grade === '상' ? 10 : grade === '중' ? 5 : 2,
          completed: completed === 'O' ? 10 : completed === '△' ? 5 : 2,
        }));

        // Find the subject object based on the selected subject
        const selectedSubject = subjects.find((subj) => subj.subject === subject);
        if (selectedSubject) {
          const newCurrent = Number(current);
          axios
            .put(`http://localhost:3001/subjects/${selectedSubject.id}`, {
              ...selectedSubject,
              current: newCurrent,
            })
            .then(() => console.log('Subject current updated'))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  if (!post || subjects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="template">
        <div id="back3">
        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
          <div>
            <div>
              <div id="pp">
              <div id="ff">
                      <span id="ii">●</span> {post.date} 수업
                    </div>
                    <div id="ggc">
                      {post.num}회차 <span id="hh"> / 8회차</span>
                    </div><br></br><br></br><br></br>

                <div id="dvdv">
                
                  <label htmlFor="subject">과목 &nbsp;&nbsp;</label>
                  <select
                    id="subject"                    
                    value={subject}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, subject: e.target.value }))}
                  >
                    <option value="전체과목">과목선택</option>
                    {studentnames.map((subj) => (
                      <option key={subj.id} value={subj.subject}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>
                <div id="crcr">
                  <label htmlFor="study">진도</label>
                  <input
                    type="text"
                    id="study"
                    value={study}
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, study: e.target.value }))}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="hw">숙제</label>
                  <input
                    type="text"
                    id="hw"
                    value={hw}
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, hw: e.target.value }))}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="current">진도 페이지</label>
                  <input
                    type="number"
                    id="current"
                    value={current}
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, current: e.target.value }))}
                  />
                </div>
                <div id="crcr"><br></br>
                  <label>학습 수행도</label>
                  <div id="grade-options">
                    <input
                      type="radio"
                      id="high"
                      name="grade"
                      value="상"
                      checked={grade === '상'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, grade: e.target.value }))}
                    />
                    <label htmlFor="high">상</label>
                    <input
                      type="radio"
                      id="medium"
                      name="grade"
                      value="중"
                      checked={grade === '중'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, grade: e.target.value }))}
                    />
                    <label htmlFor="medium">중</label>
                    <input
                      type="radio"
                      id="low"
                      name="grade"
                      value="하"
                      checked={grade === '하'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, grade: e.target.value }))}
                    />
                    <label htmlFor="low">하</label>
                  </div>
                </div><br></br>
                <div id="crcr">
                  <label>숙제 완료</label>
                  <div id="completed-options">
                    <input
                      type="radio"
                      id="completed-yes"
                      name="completed"
                      value="O"
                      checked={completed === 'O'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, completed: e.target.value }))}
                    />
                    <label htmlFor="completed-yes">O</label>
                    <input
                      type="radio"
                      id="completed-triangle"
                      name="completed"
                      value="△"
                      checked={completed === '△'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, completed: e.target.value }))}
                    />
                    <label htmlFor="completed-triangle">△</label>
                    <input
                      type="radio"
                      id="completed-no"
                      name="completed"
                      value="X"
                      checked={completed === 'X'}
                      onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, completed: e.target.value }))}
                    />
                    <label htmlFor="completed-no">X</label>
                  </div>
                </div><br></br>
                <Link to="/cardpage"><button id="crcr" onClick={handleUpdate}
                style={{ fontSize: '20px', width:'80px', height: '40px', marginBottom: '25px' }}>완료</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
