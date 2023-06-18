import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import JOY2 from './JOY2.png';
import './pagecss/main.css';

const FeedbackPage = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };


  return (
    <div id="template">
    <div id="back2">
    <div>
      <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
    </div>
    <div>
            <div>
              <div id="pp">


                <div id="crcr">
                  <label htmlFor="study"><span id="fifi">●&nbsp;</span>8회차 총 진도</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="grade"><span id="fifi">●&nbsp;</span>학습 능력이 부족한 단원</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                  />
                </div>
                <div id="crcr">
                  <label htmlFor="hw"><span id="fifi">●&nbsp;</span>숙제 이행률</label>
                  <input
                    type="text"
                    style={{ border: '1px solid #C9C9C9', borderRadius: '15px', backgroundColor: '#fff4f4'}}
                  />
                </div>

              </div>
            </div>
          </div>
    </div>
    </div>
  )
}

export default FeedbackPage