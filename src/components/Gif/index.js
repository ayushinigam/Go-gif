import React from 'react';
import './Gif.css';

export default class Gif extends React.Component {
   state = {
       isPlaying: false
   }
   
   togglePlaying = () => this.setState({isPlaying: !this.state.isPlaying});
   render() {
       const {imageData, title} = this.props;
       const {isPlaying} = this.state;
       const currentImage = isPlaying ? imageData.moving : imageData.still;
       const iconName = isPlaying ? 'pause': 'play';
       return (
        <div onClick={this.togglePlaying} className="imageContainer">
        <img src={require(`../../assets/${iconName}.svg`)} className="imageControl"/>
        <img 
        src={currentImage.url} 
        width={currentImage.width} 
        height={currentImage.height}
        onLoad={this.handleImageLoaded}
        style={{backgroundColor: 'pink'}}
        alt={title}
        className='gifImage'
        />
        
        </div>
       )
   }
}