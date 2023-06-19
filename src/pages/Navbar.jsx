import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ image }) => {
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
      <img
        src={image}
        id="logo3"
        onClick={toggleNavbar}
        style={{ cursor: 'pointer' }}
      />
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
          >
            <Link
              to="/calendarpage"
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
                캘린더
              </button>
            </Link>
            <Link
              to="/cardpage"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  width: '84px',
                  height: '50px',
                  background: location.pathname === '/cardpage' ? '#B8C2FF' : '#F0F0F0',
                  border: '1px solid #C9C9C9',
                  borderRadius: '20px',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: location.pathname === '/cardpage' ? '#ffffff' : '#784210',
                  fontFamily: 'Pretendard',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '15px',
                  float: 'left',
                  marginLeft: '5px',
                  marginTop: '5px',
                }}
              >
                수업일지
              </button>
            </Link>
            <Link
              to="/noticepage"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  width: '84px',
                  height: '50px',
                  background: location.pathname === '/noticepage' ? '#B8C2FF' : '#F0F0F0',
                  border: '1px solid #C9C9C9',
                  borderRadius: '20px',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: location.pathname === '/noticepage' ? '#ffffff' : '#784210',
                  fontFamily: 'Pretendard',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '15px',
                  float: 'left',
                  marginLeft: '5px',
                  marginTop: '5px',
                }}
              >
                알림
              </button>
            </Link>
            <Link
              to="/mypagee"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  width: '84px',
                  height: '50px',
                  background: location.pathname === '/mypage' ? '#B8C2FF' : '#F0F0F0',
                  border: '1px solid #C9C9C9',
                  borderRadius: '20px',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: location.pathname === '/mypage' ? '#ffffff' : '#784210',
                  fontFamily: 'Pretendard',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '15px',
                  float: 'left',
                  marginLeft: '5px',
                  marginTop: '5px',
                }}
                
              >
                마이페이지
              </button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
