import React from 'react';
import PropTypes from 'prop-types'; 
import Gif from '../Gif';
import './Grid.css';

class Grid extends React.Component {
    gridItems = () => {
        const {gridData} = this.props;
        return gridData.map((gridItemData) =>  <Gif imageData={gridItemData} key={gridItemData.id}/>)
    }
    render() {
        
        return (
            <div className='gridContainer'>
                { this.gridItems()}
            </div>
        )
    }
}

Grid.defaultProps = {
    gridData: []
}

Grid.propTypes = {
    gridData: PropTypes.array
}

export default Grid