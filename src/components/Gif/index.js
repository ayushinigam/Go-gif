import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GIF_PADDING} from '../../constants';
import './Gif.css';

class Gif extends Component {
   state = {
       isPlaying: this.props.isPlayingAll,
       cachedProp: this.props.isPlayingAll
   }

   static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.isPlayingAll !== prevState.cachedProp) {
        return {isPlaying: nextProps.isPlayingAll, cachedProp: nextProps.isPlayingAll};
    }
    return null;
   }

   toggleGifPlaying = () => this.setState({isPlaying: !this.state.isPlaying});

   render() {
       const {isPlaying} = this.state;
       const {imageData, title, cellWidth} = this.props;
       const iconName = isPlaying ? 'pause': 'play';
       const currentImage = isPlaying ? imageData.moving : imageData.still;
       const imageHeight = (currentImage.height/currentImage.width)*cellWidth;
       return (
        <div className="imageContainer" onClick={this.toggleGifPlaying} style={{margin: `${GIF_PADDING}px`}}>
            <img className="imageControl" src={require(`../../assets/${iconName}.svg`)} alt="play pause button"/>
            <img className='gifImage' src={currentImage.url} width={cellWidth-(GIF_PADDING*2)} height={imageHeight} alt={title}
            />
        </div>
       )
   }
}

Gif.defaultProps = {
    gridData: [],
    isPlayingAll: false
}

Gif.propTypes = {
    gridData: PropTypes.array,
    isPlayingAll: PropTypes.bool
}

export default Gif