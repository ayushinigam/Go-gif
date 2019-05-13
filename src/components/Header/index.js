import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import './Header.css';

const Header = (props) => {
    const {isPlayingAll, togglePlayingState} = props;
    const gifControlText = isPlayingAll ? 'Pause All' : 'Play All';
    return (
     <div  className="headerContainer">
        <img src={require('../../assets/appLogo.png')} className="appLogo"/>
        <div className="controlsContainer" onClick={togglePlayingState}>
                {gifControlText}
        </div>
     </div>
    )
}

Header.defaultProps = {
    isPlayingAll: false, 
    togglePlayingState: () => {}
}

Header.propTypes = {
    isPlayingAll: PropTypes.bool,
    togglePlayingState: PropTypes.func
}

export default Header