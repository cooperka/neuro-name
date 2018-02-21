// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import CelebImage from '../../CelebImage';
import { next } from './actions';

import './styles.css';

type Props = {
  imageData: any,

  imageOrder: any,
  currIndex: number,
  handleNext: () => void,
};

class Memorize extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      currIndex: state.memorize.currIndex,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleNext: () => {
        dispatch(next());
      },
    };
  }

  render() {
    const { imageData, imageOrder, currIndex, handleNext } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currCeleb = imageData[imageOrder[currIndex]];

    return (
      <div className="Memorize">
        <div className="title">Memorize</div>
        <div className="section">
          <CelebImage celeb={currCeleb} />
          <div className="subtitle">
            <a href={`https://en.wikipedia.org/?curid=${currCeleb.id}`}>{currCeleb.name}</a>
          </div>
        </div>
        <div className="section">
          <Button onClick={handleNext}>Next {`(${currIndex + 1}/${numItems})`}</Button>
        </div>
      </div>
    );
  }

}

export default connect(Memorize.mapStateToProps, Memorize.mapDispatchToProps)(Memorize);
