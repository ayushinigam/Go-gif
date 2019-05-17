import React, {Component} from 'react';
import { formatGiphyData, initialiseDataArray, isScrollBottom, throttle } from '../../utils/common.utils';
import { callGiphyAPI } from '../../utils/api.utils';
import Search from '../Search';
import Grid from '../Grid';
import Header from '../Header';
import './App.css';
class App extends Component {
    state = {
        searchValue: '',
        apiCallCount: 0,
        gridData: [],
        isPlayingAll: false,
        noGIf: false
    }
    componentDidMount = async () => {
      this.initialiseState();
      window.addEventListener('scroll', false);
    }
    initialiseState = async(searchValue = '') => {
      await this.setState({searchValue, apiCallCount: 0, gridData: initialiseDataArray()});
      await this.getGif();
    }
    onScroll = () => isScrollBottom() && this.getGif();
    getGif = () => {
      const {apiCallCount, gridData, searchValue} = this.state;
      callGiphyAPI(searchValue, apiCallCount)
      .then((response) => {
        if(response.data.length) {
          const formattedData = formatGiphyData(response.data, gridData)
          this.setState({gridData: formattedData, apiCallCount: apiCallCount + 1});
        } else {
          this.setState({noGIf: true})
        }
      });
    }
    togglePlayingState = () => this.setState({isPlayingAll: !this.state.isPlayingAll});
    componentWillUnmount = () => {
      window.removeEventListener('scroll', this.onScroll, false);
    }
render() {
  const {isPlayingAll, noGIf} = this.state;
  return (
    <div className="appContainer">
      <Header togglePlayingState={this.togglePlayingState} isPlayingAll={isPlayingAll} getTrendingGif={this.initialiseState}>
        <Search updateSearchValue={this.initialiseState}/>
      </Header>
      { !noGIf ? <Grid gridData={this.state.gridData} isPlayingAll={isPlayingAll}/>
      : <div className="noGifMessage"> No gif found! :) </div>
      }

    </div>
  );
}
}

export default App;
