// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import Recall from './component';

it('renders', () => {
  const tree = renderer.create(<Recall currIndex={0} numItems={1} imageOrder={[0]} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
