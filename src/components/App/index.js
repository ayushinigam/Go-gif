import React from 'react';
import Search from '../Search';
import './App.css';

class App extends React.Component {
    state = {
        searchValue: '',
    }
    updateSearchValue = (value) => {
        this.setState({searchValue: value});
        console.log(this.state.searchValue, value);
        
    }
render() {
  return (
    <div className="appContainer">
      <Search updateSearchValue={this.updateSearchValue}/>
    </div>
  );
}
}

export default App;
