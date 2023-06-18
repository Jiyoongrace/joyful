import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <img
        src="img_url"
        alt="Navigation"
        onClick={toggleNavBar}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <nav
          style={{
            width: '381px',
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <Link to="/calendarpage" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'blue',
                borderRadius: '50%',
              }}
            >
              Calendar
            </button>
          </Link>
          <Link to="/classpage" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'green',
                borderRadius: '50%',
              }}
            >
              Class
            </button>
          </Link>
          <Link to="/noticepage" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'yellow',
                borderRadius: '50%',
              }}
            >
              Notice
            </button>
          </Link>
          <Link to="/mypage" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'red',
                borderRadius: '50%',
              }}
            >
              My Page
            </button>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default navbar;
