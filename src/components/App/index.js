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
        isPlayingAll: false,
        noGIf: false
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
        if(response.data.length) {
          const formattedData = formatGiphyData(response.data, gridData)
          this.setState({gridData: formattedData,apiCallCount: apiCallCount + 1});
        } else {
          this.setState({noGIf: true});
        }
      })
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
  const {isPlayingAll, noGIf} = this.state;
  return (
    <div className="appContainer">
      <Header togglePlayingState={this.togglePlayingState} isPlayingAll={isPlayingAll}/>
      <Search updateSearchValue={this.updateSearchValue}/>
      {!noGIf ? <Grid gridData={this.state.gridData} isPlayingAll={isPlayingAll}/>
      : <div className="noGifMessage"> No gif found! 😔 </div>
      }

    </div>
  );
}
}

export default App;
