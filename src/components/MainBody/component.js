// @flow

import React from 'react';

import NavButton from '../NavButton/index';

import './styles.css';

function MainBody() {
  return (
    <div className="MainBody page">
      <div className="title">Celebrain</div>
      <div className="section">
        <div className="subtitle">
          Improve your memory by matching celebrity names to faces.
        </div>
      </div>
      <div className="buttons">
        <NavButton bordered linkTo="/game">Start!</NavButton>
      </div>
    </div>
  );
}

export default MainBody;
