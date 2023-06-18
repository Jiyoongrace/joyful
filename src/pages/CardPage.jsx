import React from 'react';
import axios from 'axios';
import './pagecss/main.css';
import { Link } from 'react-router-dom';

const CardPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [form, setForm] = React.useState({ id: '', study: '', hw: '', subject: 'all' });
  const [update, setUpdate] = React.useState({ id: '', study: '', hw: '', subject: '' });
  const { id, study, hw, subject } = update;
  const [open, setOpen] = React.useState(false);
  const [ratio, setRatio] = React.useState(0);

  React.useEffect(() => {
    axios.get('http://localhost:3001/subjects').then(({ data }) => {
      setSubjects(data);
    });
  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:3001/lessons').then(({ data }) => {
      setPosts(data);
    });
  }, []);

  React.useEffect(() => {
    if (form.subject) {
      axios
        .get(`http://localhost:3001/subjects?subject=${form.subject}`)
        .then(({ data }) => {
          if (data.length > 0) {
            const { current, pages } = data[0];
            const calculatedRatio = ((current / pages) * 100).toFixed(2); // Round the ratio to 2 decimal places
            setRatio(calculatedRatio);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [form.subject]);

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
          <img src="JOY2.png" id="logo3"></img>
          <div id="aa">
            이숙명 <span id="cc"> &nbsp; 학생의</span>
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
            onChange={(e) => setForm((prevForm) => ({ ...prevForm, subject: e.target.value }))}
          >
            <option value="all">전체</option> {/* Add a new option for displaying all data */}
            {subjects.map((subject) => (
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
            <div style={{ width: '100%', height: '20px', backgroundColor: '#eee', borderRadius: '10px', marginTop: '15px' }}>
              <div style={progressBarStyles}></div>
            </div>
          </div>

          <div>
            <br></br>
            {posts
            .filter((post) => {
              if (form.subject === 'all') { // Check if the selected option is 'all'
                return true; // Display all posts
              }
              return subjects.find((subject) => subject.subject === post.subject)?.subject === form.subject;
            }).map((post) => {
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
                        style={{ border: '1px solid #C9C9C9', borderRadius: '20px', backgroundColor: '#fff4f4' }}
                      >
                        &nbsp;&nbsp;{post.study}
                      </div>
                    </div>
                    <div id="cont">
                      <div id="jj">오늘의 숙제</div> &nbsp;
                      <div
                        id="bbb"
                        style={{ border: '1px solid #C9C9C9', borderRadius: '20px', backgroundColor: '#fff4f4' }}
                      >
                        &nbsp;&nbsp;{post.hw}
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <Link to={`/classpage/${post.id}`}>
                      <button id="zz">일지 수정</button>
                    </Link>
                    &nbsp;&nbsp;
                    <button
                      id="zz"
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3001/lessons/${post.id}`)
                          .then(() =>
                            setPosts((prev) => prev.filter((item) => post.id !== item.id))
                          )
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
        </div>
      </div>
    </div>
  );
};

export default CardPage;
