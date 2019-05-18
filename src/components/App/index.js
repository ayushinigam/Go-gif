import React, {Component} from 'react';
import { formatGiphyData, initialiseDataArray, isScrollBottom } from '../../utils/common.utils';
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
        noGIf: false,
        apiCallInProgress: false
    }
    componentDidMount = () => {
      this.updateGiphyData();
      window.addEventListener('scroll', this.onScroll,false);
    }
    updateGiphyData = async (searchValue = '') => {
      await this.setState({searchValue, apiCallCount: 0, gridData: initialiseDataArray()});
      await this.getGiphyData();
    }
    onScroll = () => isScrollBottom() && this.getGiphyData();
    getGiphyData = () => {
      const {apiCallCount, gridData, searchValue, apiCallInProgress} = this.state;
      if(!apiCallInProgress) {
        this.setState({apiCallInProgress: true});
        callGiphyAPI(searchValue, apiCallCount)
          .then((response) => {
            const noGIf = !response.data.length && !apiCallCount;
            const formattedData = formatGiphyData(response.data, gridData)
            this.setState({gridData: formattedData, apiCallCount: apiCallCount + 1, apiCallInProgress: false, noGIf});
          }).catch(() => this.setState({apiCallInProgress: false}))
      }
    }
    togglePlayingState = () => this.setState({isPlayingAll: !this.state.isPlayingAll});
    componentWillUnmount = () => {
      window.removeEventListener('scroll', this.onScroll, false);
    }
render() {
  const {isPlayingAll, noGIf, gridData} = this.state;
  return (
    <div className="appContainer">
      <Header togglePlayingState={this.togglePlayingState} isPlayingAll={isPlayingAll} getTrendingGif={this.updateGiphyData}>
        <Search updateSearchValue={this.updateGiphyData}/>
      </Header>
      { !noGIf ? <Grid gridData={gridData} isPlayingAll={isPlayingAll}/>
      : <div className="noGifMessage"> No gif found! :) </div>
      }
    </div>
  );
}
}

export default App;
