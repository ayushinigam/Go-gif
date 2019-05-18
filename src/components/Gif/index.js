import React, { Component } from "react";
import PropTypes from "prop-types";
import { GIF_PADDING, WHATSAPP_SHARE_BASE_URL } from "../../constants";
import "./Gif.css";

class Gif extends Component {
   state = {
       isPlaying: this.props.isPlayingAll,
       cachedProp: this.props.isPlayingAll,
   }

   static getDerivedStateFromProps(nextProps, prevState) {
       if (nextProps.isPlayingAll !== prevState.cachedProp) {
           return { isPlaying: nextProps.isPlayingAll, cachedProp: nextProps.isPlayingAll };
       }
       return null;
   }

   toggleGifPlaying = () => this.setState({ isPlaying: !this.state.isPlaying });

   onShareClick = event => event.stopPropagation();

   render() {
       const { isPlaying } = this.state;
       const { imageData, title, cellWidth } = this.props;
       const iconName = isPlaying ? "pause" : "play";
       const currentImage = isPlaying ? imageData.moving : imageData.still;
       const imageWidth = cellWidth - (GIF_PADDING * 2);
       const imageHeight = (currentImage.height / currentImage.width) * cellWidth;
       return (
           <div className="imageContainer" onClick={this.toggleGifPlaying} style={{ margin: `${GIF_PADDING}px` }}>
               <img className="imageControl" src={require(`../../assets/${iconName}.svg`)} alt="play pause button" />
               <img className="gifImage" src={currentImage.url} width={imageWidth} height={imageHeight} alt={title} />
               <a
                   className="share"
                   href={`${WHATSAPP_SHARE_BASE_URL}${imageData.moving.url}`}
                   onClick={this.onShareClick}
                   target="_blank"
               >
                   <img className="whatsAppIcon" src={require("../../assets/whatsapp.svg")} alt="share on whatsapp" />
               </a>
           </div>
       );
   }
}

Gif.defaultProps = {
    imageData: [],
    title: "",
    cellWidth: 10,
    isPlayingAll: false,
};

Gif.propTypes = {
    imageData: PropTypes.array,
    title: PropTypes.string,
    cellWidth: PropTypes.number,
    isPlayingAll: PropTypes.bool,
};

export default Gif;
