// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Button } from 'material-ui';

import CelebImage from '../../CelebImage';

import { getDisplayName } from '../../../utils/celeb-utils';
import { next } from './actions';

import './styles.css';

type Props = {
  imageData: any,

  imageOrder: any,
  currIndex: number,
  onlyFirstNames: boolean,

  handleNext: () => void,
};

class Memorize extends Component<Props> {

  static mapStateToProps(state) {
    return {
      imageOrder: state.game.imageOrder,
      currIndex: state.memorize.currIndex,
      onlyFirstNames: state.game.onlyFirstNames,
    };
  }

  static mapDispatchToProps(dispatch: (Object) => void) {
    return {
      handleNext: () => {
        dispatch(next());
      },
    };
  }

  render() {
    const { imageData, imageOrder, currIndex, onlyFirstNames, handleNext } = this.props;
    const numItems = imageOrder.length;

    if (currIndex >= numItems) return null;

    const currCeleb = imageData[imageOrder[currIndex]];

    return (
      <div className="Memorize">
        <div className="title">Memorize</div>
        <div className="section">
          <CelebImage celeb={currCeleb} />
          <div className="subtitle">
            <a className="name" href={`https://en.wikipedia.org/?curid=${currCeleb.id}`}>
              {getDisplayName(currCeleb, onlyFirstNames)}
            </a>
          </div>
        </div>
        <div className="section">
          <Button onClick={handleNext}>{`Next (${currIndex + 1}/${numItems})`}</Button>
        </div>
      </div>
    );
  }

}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
  connect(Memorize.mapStateToProps, Memorize.mapDispatchToProps),
)(Memorize);
