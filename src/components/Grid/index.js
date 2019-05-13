import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getCellWidth} from '../../utils/common.utils' 
import Gif from '../Gif';
import './Grid.css';
class Grid extends Component {

    getGridColumn = (gridData, cellWidth) => 
         gridData.map((gridItemData) =>  
         <Gif imageData={gridItemData} key={gridItemData.id} 
         cellWidth={cellWidth} isPlayingAll={this.props.isPlayingAll}
         />
    );

    render() {
        const cellWidth = getCellWidth(this.props.gridData.length);
        const renderGrid = this.props.gridData.map((gridColumnData, index) => (
            <div key={index}>{this.getGridColumn(gridColumnData.data, cellWidth)}</div>)
        );
        return (
            <div className='gridContainer'>
                {renderGrid}    
            </div>
        )
    }
}

Grid.defaultProps = {
    gridData: [],
    isPlayingAll: false
}

Grid.propTypes = {
    gridData: PropTypes.array,
    isPlayingAll: PropTypes.bool
}

export default Grid