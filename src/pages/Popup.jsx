import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Popup = ({ date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <div>
        <button id="crcr" onClick={toggleNavbar}
                style={{ cursor: 'pointer', fontSize: '20px', width:'80px', height: '40px', marginBottom: '25px' }}>완료</button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '999',
          }}
          onClick={closeNavbar}
        >
          <nav
            style={{
              width: '380px',
              height: '70px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F7F7F7',
              border: '1px solid #C9C9C9',
              borderRadius: '30px',
              margin: '0 auto',
              marginTop: '45px',
              fontFamily: 'Pretendard',
              padding: '5px',
            }}
          ><p>{date} 수업 준비 완료!</p>
            <Link
              to="/cardpage"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  width: '84px',
                  height: '50px',
                  background: location.pathname === '/calendarpage' ? '#B8C2FF' : '#F0F0F0',
                  border: '1px solid #C9C9C9',
                  borderRadius: '20px',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: location.pathname === '/calendarpage' ? '#ffffff' : '#784210',
                  fontFamily: 'Pretendard',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '15px',
                  float: 'left',
                  marginLeft: '5px',
                  marginTop: '5px',
                }}
              >
                닫기
              </button>
            </Link>
            
          </nav>
        </div>
      )}
    </div>
  );
};

export default Popup;
