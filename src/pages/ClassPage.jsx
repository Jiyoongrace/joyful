import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pagecss/main.css';

const ClassPage = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [update, setUpdate] = React.useState({ subject:'', study: '', hw: '', current: '', grade: '', completed: '' });
  const { subject, study, hw, current, grade, completed } = update;

  React.useEffect(() => {
    // Fetch the specific post data using the ID
    axios.get(`http://localhost:3001/lessons/${id}`)
      .then(({ data }) => {
        setPost(data);
        // Update the update state with the fetched data if available
        setUpdate({
          subject: data?.subject || '',
          study: data?.study || '',
          hw: data?.hw || '',
          current: data?.current || '',
          grade: data?.grade || '',
          completed: data?.completed || ''
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleUpdate = () => {
    // Perform update operation using the updated data
    axios.put(`http://localhost:3001/lessons/${id}`, {
      ...post,
      subject,
      study,
      hw,
      current: Number(current), // Convert current to a number
      grade: grade === '상' ? 10 : grade === '중' ? 5 : 2,
      completed: completed === 'O' ? 10 : completed === '△' ? 5 : 2
    })
      .then(() => {
        // Update the post state with the updated data
        setPost((prevPost) => ({
          ...prevPost,
          study,
          hw,
          current: Number(current), // Convert current to a number
          grade: grade === '상' ? 10 : grade === '중' ? 5 : 2,
          completed: completed === 'O' ? 10 : completed === '△' ? 5 : 2
        }));

        // Update the subject's current data
        axios.get(`http://localhost:3001/subjects?subject=${post.subject}`)
          .then(({ data }) => {
            if (data.length > 0) {
              const subjectId = data[0].id;
              const newCurrent = Number(current); // Convert current to a number
              axios.put(`http://localhost:3001/subjects/${subjectId}`, {
                ...data[0],
                current: newCurrent
              })
                .then(() => console.log('Subject current updated'))
                .catch((error) => console.log(error));
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  if (!post) {
    return <div>Loading...</div>; // Display a loading state while fetching data
  }

  return (
    <div id="template">
      <div id="back3">
        <img src="JOY2.png" id="logo3" alt="logo" />
        <div>
          <div>
            <h2>ClassPage</h2>
            <div>
              <div>Date: {post.date}</div>
              <div>Number: {post.num}</div>
              <div>
                <label htmlFor="subject">subject:</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, subject: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="study">Study:</label>
                <input
                  type="text"
                  id="study"
                  value={study}
                  onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, study: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="hw">Homework:</label>
                <input
                  type="text"
                  id="hw"
                  value={hw}
                  onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, hw: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="current">Current:</label>
                <input
                  type="number" // Set the input type to "number"
                  id="current"
                  value={current}
                  onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, current: e.target.value }))}
                />
              </div>
              <div>
                <label>학습 수행도:</label>
                <div>
                  <input
                    type="radio"
                    id="high"
                    name="grade"
                    value="상"
                    checked={grade === '상'}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, grade: e.target.value }))}
                  />
                  <label htmlFor="high">상</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="medium"
                    name="grade"
                    value="중"
                    checked={grade === '중'}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, grade: e.target.value }))}
                  />
                  <label htmlFor="medium">중</label>
                </div>
                <div>
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
              </div>
              <div>
                <label>숙제 완료:</label>
                <div>
                  <input
                    type="radio"
                    id="completed-yes"
                    name="completed"
                    value="O"
                    checked={completed === 'O'}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, completed: e.target.value }))}
                  />
                  <label htmlFor="completed-yes">O</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="completed-triangle"
                    name="completed"
                    value="△"
                    checked={completed === '△'}
                    onChange={(e) => setUpdate((prevUpdate) => ({ ...prevUpdate, completed: e.target.value }))}
                  />
                  <label htmlFor="completed-triangle">△</label>
                </div>
                <div>
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
              </div>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
