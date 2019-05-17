import React from 'react';
import PropTypes from 'prop-types'; 
import './Header.css';

const Header = (props) => {
    const {isPlayingAll, togglePlayingState} = props;
    const gifControlText = isPlayingAll ? 'Pause All' : 'Play All';
    const getTrendingGif = () => props.getTrendingGif('');
    return (
     <div className="headerContainer">
        <div className="logoContainer">
            <img src={require('../../assets/appLogo.png')} className="appLogo" alt="app logo"/>
            {props.children}
        </div>
        <div className="controlContainer">
                <div onClick={getTrendingGif} className="controlButton">Trending</div>
                <div onClick={togglePlayingState}  className="controlButton">{gifControlText}</div>
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