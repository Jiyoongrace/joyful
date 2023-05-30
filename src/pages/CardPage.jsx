import React from 'react';
import axios from 'axios';

const CardPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [form, setForm] = React.useState({ id: '', title: '', author: '' });
  const [update, setUpdate] = React.useState({ id: '', title: '', author: '' });
  const { id, title, author } = update;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // read
    axios({ url: 'http://localhost:3001/posts', method: 'GET' }).then(
      ({ data }) => setPosts(data)
    );
  }, []);
  return (
    <div>
              <div id="template">
        
        <div id="back2">

        <img src="JOY2.png" id="logo3"></img>
        {posts.map((post) => {
        return (
          <div
            key={`post_${post.id}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: 10, border: '1px solid black' }}>
              ID: {post.id}
            </div>
            <div style={{ marginRight: 10, border: '1px solid black' }}>
              title: {post.title}
            </div>
            <div style={{ marginRight: 10, border: '1px solid black' }}>
              author: {post.author}
            </div>
            <button
              onClick={() => {
                setUpdate((prev) => ({
                  ...prev,
                  id: post.id,
                  author: post.author,
                  title: post.title,
                }));
                setOpen(true);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                // delete
                axios
                  .delete(`http://localhost:3001/posts/${post.id}`)
                  .then(() =>
                    setPosts((prev) =>
                      prev.filter((item) => post.id !== item.id)
                    )
                  )
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

        </div>
    </div>
    </div>
  )
}

export default CardPage;