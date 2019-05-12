import React from 'react';
import renderer from 'react-test-renderer';
import Search from './index';

it('renders correctly', () => {
  const tree = renderer.create(<Search/>).toJSON();
  expect(tree).toMatchSnapshot();
});
