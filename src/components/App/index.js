import React, {Component} from 'react';
import { formatGiphyData, initialiseDataArray, isScrollBottom } from '../../utils/common.utils';
import { getGif } from '../../utils/api.utils';
import Search from '../Search';
import Grid from '../Grid';
import Header from '../Header';
import './App.css';
class App extends Component {
    state = {
        searchValue: '',
        apiCallCount: 0,
        gridData: [],
        isPlayingAll: false
    }
    componentDidMount() {
      this.setState({gridData: initialiseDataArray()});
      window.addEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => isScrollBottom() && this.callGetGif();
    callGetGif = () => {
      const {searchValue, apiCallCount, gridData} = this.state;
      getGif(searchValue, apiCallCount)
      .then((response) => {
        const formattedData = formatGiphyData(response.data, gridData)
        this.setState({gridData: formattedData,apiCallCount: apiCallCount + 1});
      });
    }
    updateSearchValue = async (value) => {
        await this.setState({searchValue: value, apiCallCount: 0, gridData: initialiseDataArray()});
        this.callGetGif();
    }
    togglePlayingState = () => this.setState({isPlayingAll: !this.state.isPlayingAll});
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }
render() {
  const {isPlayingAll, gridData} = this.state;
  return (
    <div className="appContainer">
      <Header togglePlayingState={this.togglePlayingState} isPlayingAll={isPlayingAll}/>
      <Search updateSearchValue={this.updateSearchValue}/>
      <Grid gridData={this.state.gridData} isPlayingAll={isPlayingAll}/>
    </div>
  );
}
}

export default App;
