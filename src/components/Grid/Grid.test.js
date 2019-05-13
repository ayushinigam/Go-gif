import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './index';

describe(('Grid'), () => {
    const gridData = [
        { data: [{
            moving: {height: 10, width: 10, url: 'test/moving'},
            still: {height: 10, width: 10, url: 'test/still'},
            id: '1'
            }], 
        totalHeight: 10
        }
    ];
it('renders correctly', () => {
  const tree = renderer.create(<Grid gridData={gridData}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
});
