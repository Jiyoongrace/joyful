import React, { useState } from 'react';
import Navbar from './Navbar';
import JOY2 from './JOY2.png';

const NoticePage = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
      <div id="template">
        <div id="back3">
        <div>
          <Navbar isOpen={isNavBarOpen} image={JOY2}></Navbar>
        </div>
      </div>
      </div>
  )
}

export default NoticePage