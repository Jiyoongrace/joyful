import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>작성 완료!</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={openPopup}>팝업 열기</button>
      {showPopup &&
        <div className="popup-background">
          <Popup onClose={closePopup} />
        </div>
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
