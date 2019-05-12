import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Search from './index';

describe('Search', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Search/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  const updateSearchValue = jest.fn();
  const searchComponent = shallow(<Search updateSearchValue={updateSearchValue}/>)
  it('should have an initial value as empty string', () => {
    expect(searchComponent.instance().state.value).toEqual('');
  });
  it('should update value on Change', () => {
    searchComponent.instance().onChange({target: {value: 'cat'}});
    expect(searchComponent.instance().state.value).toEqual('cat');
  });
  it('updateValue: should trigger update search value', () => {
    searchComponent.instance().setState({value: ''});
    searchComponent.instance().updateValue();
    expect(searchComponent.instance().props.updateSearchValue).toHaveBeenCalled();
  });

});


