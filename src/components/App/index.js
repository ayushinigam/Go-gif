import React from 'react';
import Search from '../Search';
import './App.css';
import { getGif } from '../../utils/api.utils';
import { formatData } from '../../utils/common.utils';
import Grid from '../Grid';

class App extends React.Component {
    state = {
        searchValue: '',
        apiCallCount: 0,
        gridData: []
    }
    callGetGif = (value = '') => {
      const {searchValue, apiCallCount} = this.state;
      getGif(value || searchValue, apiCallCount).then((response) => {      
        this.setState({
          gridData: formatData(response.data),
          apiCallCount: apiCallCount + 1
        });
      })
    }
    updateSearchValue = (value) => {
        this.setState({searchValue: value, apiCallCount: 0});
        this.callGetGif(value);
    }
render() {
  console.log(this.state);
  
  return (
    <div className="appContainer">
      <Search updateSearchValue={this.updateSearchValue}/>
      <Grid gridData={this.state.gridData}/>
    </div>
  );
}
}

export default App;
