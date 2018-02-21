// @flow

import React from 'react';

import './styles.css';

function About() {
  return (
    <div className="About page">
      <div className="title">About</div>

      <div className="section">
        <div className="subtitle">Inspiration</div>
        <div className="description">
          I{"'"}ve always had a difficult time remembering peoples names --
          especially movie characters and celebrities --
          so I{"'"}ve recently been trying harder to improve.
          This game is a fun attempt at solving two problems at once.
        </div>
      </div>

      <div className="section">
        <div className="subtitle">Attribution</div>
        <div className="description">
          Images are sourced from Wikipedia and may be subject to copyright.
          Click on the images to find their original source and licensing on the Wikimedia Commons.
        </div>
      </div>
    </div>
  );
}

export default About;
